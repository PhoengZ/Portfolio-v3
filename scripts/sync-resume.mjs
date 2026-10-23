import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const RESUME_PUBLIC_PATH = path.join(rootDir, "public", "Resume.pdf");
const HASH_FILE_PATH = path.join(rootDir, "data", "resume-hash.txt");
const EXPERIENCE_JSON_PATH = path.join(rootDir, "data", "experience.json");

const SUPABASE_RESUME_URL = process.env.SUPABASE_RESUME_URL || process.env.R2_RESUME_URL || process.env.RESUME_PUBLIC_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const isForce = process.argv.includes("--force");

/**
 * Calculate SHA-256 hash of a buffer
 */
function calculateHash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex").toLowerCase();
}

/**
 * Fetch or read PDF buffer
 */
async function getResumeBuffer() {
  if (SUPABASE_RESUME_URL) {
    console.log(`[Sync] Fetching resume from Supabase Storage: ${SUPABASE_RESUME_URL}`);
    const response = await fetch(SUPABASE_RESUME_URL);
    if (!response.ok) {
      throw new Error(`Failed to download from Supabase Storage: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save downloaded PDF to public/Resume.pdf
    fs.mkdirSync(path.dirname(RESUME_PUBLIC_PATH), { recursive: true });
    fs.writeFileSync(RESUME_PUBLIC_PATH, buffer);
    console.log(`[Sync] Saved latest PDF to public/Resume.pdf`);
    return buffer;
  }

  // Fallback to local file
  if (fs.existsSync(RESUME_PUBLIC_PATH)) {
    console.log(`[Sync] SUPABASE_RESUME_URL not provided. Reading local public/Resume.pdf`);
    return fs.readFileSync(RESUME_PUBLIC_PATH);
  }

  throw new Error(`No resume found! Set SUPABASE_RESUME_URL or place Resume.pdf in public/Resume.pdf`);
}

/**
 * Validate the parsed AI response to ensure data integrity
 */
function validateExtractedData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Validation Error: Extracted data is not a valid object");
  }

  if (!Array.isArray(data.experiences) || data.experiences.length === 0) {
    throw new Error("Validation Error: 'experiences' array is missing or empty");
  }

  for (let i = 0; i < data.experiences.length; i++) {
    const item = data.experiences[i];
    if (!item.company || !item.role || !item.period || !item.description) {
      throw new Error(`Validation Error: Experience item #${i} is missing required fields (company, role, period, description)`);
    }
  }

  if (!data.personName || !data.currentRole || !data.currentCompany) {
    throw new Error("Validation Error: Missing profile metadata (personName, currentRole, currentCompany)");
  }

  return true;
}

/**
 * Call Gemini API with PDF Buffer using Structured JSON Output
 */
async function extractResumeContent(buffer) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables!");
  }

  const base64Data = buffer.toString("base64");
  const model = GEMINI_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const schema = {
    type: "OBJECT",
    properties: {
      personName: { type: "STRING" },
      currentRole: { type: "STRING" },
      currentCompany: { type: "STRING" },
      experiences: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            company: { type: "STRING" },
            role: { type: "STRING" },
            period: { type: "STRING", description: "e.g., August 2026 - Present" },
            description: { type: "STRING", description: "Concise summary of key impact, tech stack, and responsibilities (1-2 sentences)." }
          },
          required: ["company", "role", "period", "description"]
        }
      },
      alumniOf: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING", description: "Company or organization name" },
            roleName: { type: "STRING" },
            startDate: { type: "STRING", description: "YYYY-MM format" },
            endDate: { type: "STRING", description: "YYYY-MM format (omit or null if ongoing/present)" }
          },
          required: ["name", "roleName", "startDate"]
        }
      }
    },
    required: ["personName", "currentRole", "currentCompany", "experiences", "alumniOf"]
  };

  const prompt = `
You are an expert Resume and Professional Career Data Parser.
Analyze the attached resume PDF document and extract:
1. Candidate's full name.
2. Current job title / role.
3. Current company / organization name.
4. Professional work experience list (in chronological order, newest first).
5. Structured alumniOf organizations for schema.org Person JSON-LD (startDate & endDate in YYYY-MM format).

Preserve accurate dates, company names, and descriptive achievements. Return ONLY pure JSON matching the specified schema.
`;

  console.log(`[AI] Calling ${model} for structured resume extraction...`);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("No text output received from Gemini API");
  }

  const parsed = JSON.parse(rawText);
  validateExtractedData(parsed);
  return parsed;
}

/**
 * Main Execution
 */
async function main() {
  console.log("=== Resume Sync & Extraction Pipeline ===");
  const buffer = await getResumeBuffer();
  const currentHash = calculateHash(buffer);
  console.log(`[Hash] Current PDF SHA-256: ${currentHash}`);

  let previousHash = "";
  if (fs.existsSync(HASH_FILE_PATH)) {
    previousHash = fs.readFileSync(HASH_FILE_PATH, "utf-8").trim().toLowerCase();
    console.log(`[Hash] Previous stored SHA-256: ${previousHash}`);
  }

  if (currentHash === previousHash && !isForce) {
    console.log("✅ [Guard] Resume has not changed. Skipping extraction to save API quota.");
    process.exit(0);
  }

  console.log(isForce ? "⚡ [Force] Flag --force detected. Running extraction..." : "🔄 [Changed] Resume content changed. Running extraction...");

  const extracted = await extractResumeContent(buffer);

  // Format into project's experience.json schema
  const updatedExperienceData = {
    lastUpdated: new Date().toISOString(),
    resumeHash: currentHash,
    experiences: extracted.experiences,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: extracted.personName,
      jobTitle: extracted.currentRole,
      worksFor: {
        "@type": "Organization",
        name: extracted.currentCompany
      },
      alumniOf: extracted.alumniOf.map((item) => {
        const obj = {
          "@type": "Organization",
          name: item.name,
          roleName: item.roleName,
          startDate: item.startDate
        };
        if (item.endDate) {
          obj.endDate = item.endDate;
        }
        return obj;
      })
    }
  };

  // Write files
  fs.mkdirSync(path.dirname(EXPERIENCE_JSON_PATH), { recursive: true });
  fs.writeFileSync(EXPERIENCE_JSON_PATH, JSON.stringify(updatedExperienceData, null, 2), "utf-8");
  fs.writeFileSync(HASH_FILE_PATH, currentHash, "utf-8");

  console.log(`🎉 [Success] Updated data/experience.json and data/resume-hash.txt successfully!`);
}

main().catch((err) => {
  console.error("❌ [Pipeline Error]:", err.message);
  process.exit(1);
});
