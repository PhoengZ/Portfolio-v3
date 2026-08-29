import React from "react";
import { FaBriefcase } from "react-icons/fa";

export default function Experience() {
  const experiences = [
    {
      company: "Yuanta Securities Thailand",
      role: "AI Product Engineer",
      period: "August 2026 - Present",
      description: "Developing AI products and optimizing automation workflows to enhance financial and securities operations.",
    },
    {
      company: "Siam Commercial Bank",
      role: "AI & Automation Engineer",
      period: "June 2026 - July 2026",
      description: "Worked on AI integration and automation processes to streamline banking operations.",
    },
    {
      company: "Pixelmath",
      role: "Data Scientist",
      period: "January 2026 - Present",
      description: "Applying data science techniques to extract insights and build predictive models.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Phaolap Kulteera",
    "jobTitle": "AI Product Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Yuanta Securities Thailand"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Siam Commercial Bank",
        "roleName": "AI & Automation Engineer",
        "startDate": "2026-06",
        "endDate": "2026-07"
      },
      {
        "@type": "Organization",
        "name": "Pixelmath",
        "roleName": "Data Scientist",
        "startDate": "2026-01"
      }
    ]
  };

  return (
    <section className="w-full py-16 z-20 relative" aria-labelledby="experience-heading">
      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <h2 id="experience-heading" className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight drop-shadow-sm">
          Professional <span className="text-blue-600">Experience</span>
        </h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-300 before:to-transparent">
          {experiences.map((exp, index) => (
            <article key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-100 group-hover:bg-blue-500 text-blue-500 group-hover:text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm transition-colors duration-300 z-10">
                <FaBriefcase size={16} />
              </div>
              
              {/* Experience Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/60 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-xl text-gray-800">{exp.role}</h3>
                  <time className="text-xs sm:text-sm font-medium text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full w-fit whitespace-nowrap border border-blue-200">
                    {exp.period}
                  </time>
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-3">{exp.company}</div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
