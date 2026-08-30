**Overview / Context:**
This PR introduces several key enhancements to the portfolio website, focusing primarily on improving Search Engine Optimization (SEO) and expanding the homepage content. It adds a dynamic Experience section, configures strict Server-Side Rendering (SSR) for the homepage, and integrates full metadata configurations to ensure optimal crawling and indexing by search engines.

**Proposed Changes:**
*   **`app/components/Experience.tsx`**: Created a new `Experience` component featuring a timeline of professional roles (AI Product Engineer, Data Scientist, etc.). Integrated `JSON-LD` structured data to provide search engines with rich snippet context.
*   **`app/page.tsx`**: 
    *   Integrated the new `Experience` component into the homepage.
    *   Added `export const dynamic = "force-dynamic";` to enforce Server-Side Rendering (SSR) on every request, guaranteeing crawlers receive complete HTML.
    *   Adjusted background and container classes (`overflow-y-auto`, `min-h-screen`) to accommodate the new scrolling content seamlessly.
*   **`app/layout.tsx`**: Replaced basic metadata with a comprehensive configuration including `metadataBase` (`https://phaolap.vercel.app`), OpenGraph tags, Twitter Cards, keywords, and explicit `googleBot` crawler directives.
*   **`app/robots.ts` & `app/sitemap.ts`**: Implemented Next.js native dynamic sitemap and robots generation to expose all critical routes (`/`, `/about`, `/projects`, `/certificates`) to crawlers with appropriate priorities.
*   **Refactoring & Chores**: Cleaned up unused functions in the GitHub API route and updated `.gitignore` to exclude local agent environment files.

**How it Works / Architecture:**
*   **Next.js Metadata API**: Utilizes the built-in Next.js App Router metadata exports (`layout.tsx`, `robots.ts`, `sitemap.ts`) rather than manual `<head>` injection. This ensures metadata is reliably generated on the server before reaching the client.
*   **Structured Data (JSON-LD)**: Injects `<script type="application/ld+json">` directly into the `Experience` component, keeping the schema co-located with the UI data it represents.

**Verification:**
*   Manually verified the DOM output to ensure `<meta>` tags (OG, Twitter) are correctly injected in the `<head>`.
*   Verified that `/robots.txt` and `/sitemap.xml` resolve correctly with the `https://phaolap.vercel.app` base URL.
*   Confirmed the Next.js build treats the homepage as a dynamically rendered Server Component.
