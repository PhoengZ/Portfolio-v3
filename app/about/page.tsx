import Image from "next/image";
import Link from "next/link";
export default function About() {
  return (
    <>
      <div className="grow bg-linear-to-b from-blue-400 via-blue-300 to-blue-100 flex flex-col md:flex-row justify-center items-center py-10 md:py-0 px-6 sm:px-10 md:px-16 lg:px-24 gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex justify-center items-center relative animate-floating z-10">
          <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative">
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-25 rounded-full animate-pulse"></div>
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full relative z-10 drop-shadow-2xl"
            >
              <defs>
                <clipPath id="avatarClip">
                  <path
                    fill="#0F62FE"
                    d="M35.9,-59.7C46.7,-55.8,56,-46.8,62.8,-35.9C69.5,-25.1,73.8,-12.6,76.6,1.6C79.4,15.8,80.7,31.5,73.4,41.5C66.2,51.5,50.4,55.7,36.7,60.7C23.1,65.6,11.5,71.3,1.2,69.1C-9.1,67,-18.2,57.1,-29.7,51C-41.3,44.8,-55.3,42.4,-62.3,34.6C-69.3,26.7,-69.2,13.4,-69.7,-0.3C-70.3,-14,-71.5,-28,-65.8,-38C-60.1,-48.1,-47.5,-54.3,-35.4,-57.5C-23.3,-60.8,-11.6,-61,0.4,-61.7C12.5,-62.5,25,-63.7,35.9,-59.7Z"
                    transform="translate(100 100)"
                  />
                </clipPath>
              </defs>
              <g transform="translate(100 100)">
                <path
                  fill="#0F62FE"
                  d="M35.9,-59.7C46.7,-55.8,56,-46.8,62.8,-35.9C69.5,-25.1,73.8,-12.6,76.6,1.6C79.4,15.8,80.7,31.5,73.4,41.5C66.2,51.5,50.4,55.7,36.7,60.7C23.1,65.6,11.5,71.3,1.2,69.1C-9.1,67,-18.2,57.1,-29.7,51C-41.3,44.8,-55.3,42.4,-62.3,34.6C-69.3,26.7,-69.2,13.4,-69.7,-0.3C-70.3,-14,-71.5,-28,-65.8,-38C-60.1,-48.1,-47.5,-54.3,-35.4,-57.5C-23.3,-60.8,-11.6,-61,0.4,-61.7C12.5,-62.5,25,-63.7,35.9,-59.7Z"
                />
              </g>
              <image
                href="/Image/myself.jpg"
                x="5"
                y="22"
                width="200"
                height="200"
                clipPath="url(#avatarClip)"
                className="transition-transform duration-700 hover:scale-110"
              />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">
              About <span className="text-blue-600">Me</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl">
              I enjoy building web applications that combine beautiful design
              with powerful performance. I'm especially passionate about
              full-stack development, using modern frameworks and styling tools
              to create seamless user experiences.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl hidden sm:block">
              My goal is to become a well-rounded software engineer who not only
              writes clean code but also understands how users think. I’m
              currently open to software engineering internship opportunities
              where I can contribute and grow.
            </p>
          </div>

          <Link
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg border-2 border-green-600 transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg inline-block"
          >
            View Resume
          </Link>
        </div>
      </div>
    </>
  );
}
