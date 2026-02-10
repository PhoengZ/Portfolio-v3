"use client";
import { useState } from "react";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";

interface Certificate {
  name: string;
  file: string;
  description: string;
}

export default function Certificates() {
  const [certificates] = useState<Certificate[]>([
    {
      name: "Fullstack Web development application",
      file: "Fullstack.pdf",
      description: "Comprehensive certificate for Fullstack Web Development.",
    },
    {
      name: "Google AI Essentials",
      file: "Google.pdf",
      description: "Official Google certification for AI fundamentals.",
    },
    {
      name: "Huawei Cloud",
      file: "Huawei.pdf",
      description: "Cloud computing and architecture certification by Huawei.",
    },
    {
      name: "Developing Back-End Apps with Node.js and Express",
      file: "IBM.pdf",
      description: "IBM Professional Certificate in Back-End Development.",
    },
    {
      name: "Object-Oriented Data Structures in C++",
      file: "OOP.pdf",
      description: "Mastery of OOP principles and data structures in C++.",
    },
    {
      name: "Ordered Data Structures",
      file: "Ordered.pdf",
      description: "Advanced certification in organized data architectures.",
    },
    {
      name: "Crunching with Pandas",
      file: "Pandas.pdf",
      description:
        "Intensive data analysis and manipulation using Python Pandas.",
    },
    {
      name: "Unordered Data Structures",
      file: "Unordered.pdf",
      description: "Certification for hashing and unordered data management.",
    },
    {
      name: "Supervised Learning",
      file: "Supervised_learning.pdf",
      description: "Machine learning algorithms for predictive modeling.",
    },
    {
      name: "Unsupervised Learning",
      file: "Unsupervised_learning.pdf",
      description: "Machine learning for clustering and pattern discovery.",
    },
  ]);

  return (
    <main className="grow bg-linear-to-b from-blue-400 via-blue-300 to-blue-100 py-12 px-6 sm:px-10 md:px-16 overflow-y-auto">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12 drop-shadow-sm">
          My <span className="text-blue-700">Certificates</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="group bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-white/80"
            >
              <div className="h-full flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors">
                    {cert.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <a
                  href={`/certificates/${cert.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:bg-blue-700 active:scale-95 text-sm"
                >
                  <FaDownload className="text-xs" />
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
