"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconmapLanguage } from "../composables/icon";
import { FiCalendar, FiExternalLink } from "react-icons/fi";

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
  language: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/github/repository`,
      );
      setLoading(false);
      setProjects(res.data.data);
    };
    fetchProjects();
  }, []);
  if (loading) {
    return (
      <div className="grow flex flex-col justify-start items-center bg-linear-to-b from-blue-600 via-blue-400 to-blue-50 py-12 px-6 sm:px-10 md:px-16 gap-8">
        <div className="max-w-7xl w-full flex flex-col items-center gap-10">
          <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg text-center">
            My <span className="text-gray-900/80">Projects</span>
          </h1>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900/80"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-start items-center bg-linear-to-b from-blue-600 via-blue-400 to-blue-50 py-12 px-6 sm:px-10 md:px-16 gap-8">
      <div className="max-w-7xl w-full flex flex-col items-center gap-10">
        <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg text-center">
          My <span className="text-gray-900/80">Projects</span>
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {projects.map((project) => (
            <li
              className="group h-full flex flex-col bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8
              shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/70 hover:cursor-pointer
              relative overflow-hidden"
              key={project.id}
              onClick={() => window.open(project.link, "_blank")}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-2xl md:text-3xl text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                  {project.name}
                </h2>
                <FiExternalLink className="text-gray-400 group-hover:text-blue-600 transition-colors text-xl mt-1 shrink-0" />
              </div>

              <p className="grow text-gray-600 leading-relaxed text-sm md:text-base">
                {project.description}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2.5">
                  {project.language.map((lang: any) => {
                    const Icon = IconmapLanguage[lang];
                    return Icon ? (
                      <div
                        key={lang}
                        className="bg-white/50 p-2 rounded-xl shadow-sm group-hover:bg-white transition-colors"
                      >
                        <Icon
                          className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                          title={lang}
                        />
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="pt-4 border-t border-gray-200/50 flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <FiCalendar className="text-blue-500" />
                  <span>Updated on {project.lastUpdate}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
