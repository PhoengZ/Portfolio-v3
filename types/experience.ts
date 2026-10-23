export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface AlumniItem {
  "@type": "Organization";
  name: string;
  roleName: string;
  startDate: string;
  endDate?: string;
}

export interface ExperienceData {
  lastUpdated: string;
  resumeHash?: string;
  experiences: ExperienceItem[];
  jsonLd: {
    "@context": "https://schema.org";
    "@type": "Person";
    name: string;
    jobTitle: string;
    worksFor: {
      "@type": "Organization";
      name: string;
    };
    alumniOf: AlumniItem[];
  };
}
