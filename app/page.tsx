import "./animate.css";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Home() {
  return (
    <>
      <main className="grow bg-linear-to-b from-blue-400 via-blue-300 to-blue-100 flex items-center justify-center overflow-visible lg:overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 gap-4 sm:gap-6 md:gap-12 h-full py-4 md:py-0">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-8 z-10">
            <div className="space-y-3 md:space-y-4 text-center md:text-left">
              <h1 className="mx-auto sm:mx-0 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight typing-1">
                Hi, I'm <span className="text-gray-900">Phaolap Kulteera</span>
              </h1>
              <h2 className="mx-auto sm:mx-0 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 typing-2">
                Developer and Data scientist{" "}
                <span className="text-blue-600">Junior</span>
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed drop-shadow-sm">
                A passionate Full Stack Developer focused on building clean,
                impactful solutions. Currently exploring the intersection of
                data science and modern web applications.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
              {/* <Link
                href="/contact"
                className="px-6 py-2 md:px-8 md:py-3 bg-green-500 text-white font-bold rounded-full shadow-lg border-2 border-green-600 transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-base md:text-lg"
              >
                Let's Talk
              </Link> */}
              <Link
                href="/projects"
                className="px-6 py-2 md:px-8 md:py-3 bg-white text-blue-600 font-bold rounded-full shadow-md border-2 border-blue-500 transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-base md:text-lg"
              >
                View Projects
              </Link>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 pt-2 md:pt-4">
              {[
                {
                  icon: <BiLogoGmail />,
                  href: "https://mail.google.com/mail/?view=cm&to=phaolapkulteera@gmail.com",
                  color: "hover:text-red-500 border-red-200",
                },
                {
                  icon: <FaGithub />,
                  href: "https://github.com/PhoengZ",
                  color: "hover:text-gray-900 border-gray-300",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/c_phaooo_/",
                  color: "hover:text-pink-600 border-pink-200",
                },
                {
                  icon: <FaLinkedin />,
                  href: "https://www.linkedin.com/in/phaolapkulteera/",
                  color: "hover:text-blue-700 border-blue-200",
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className={`text-2xl sm:text-3xl text-gray-700 p-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-md ${social.color}`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center relative animate-floating mt-8 md:mt-0">
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative">
              <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-25 rounded-full animate-pulse"></div>

              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10 drop-shadow-2xl"
              >
                <defs>
                  <clipPath id="avatarClip">
                    <path
                      d="M48.3,-43.3C58.2,-26.1,58.8,-6.3,56.1,15.8C53.4,37.8,47.5,62.1,34.8,65.6C22.2,69.1,2.8,51.8,-19.5,40.9C-41.7,30,-66.8,25.5,-74.4,11.5C-82,-2.5,-72,-26,-56.7,-44.4C-41.3,-62.8,-20.7,-76.2,-0.7,-75.6C19.2,-75,38.4,-60.4,48.3,-43.3Z"
                      transform="translate(100 100)"
                    />
                  </clipPath>
                </defs>
                <g transform="translate(100 100)">
                  <path
                    fill="#0F62FE"
                    d="M48.3,-43.3C58.2,-26.1,58.8,-6.3,56.1,15.8C53.4,37.8,47.5,62.1,34.8,65.6C22.2,69.1,2.8,51.8,-19.5,40.9C-41.7,30,-66.8,25.5,-74.4,11.5C-82,-2.5,-72,-26,-56.7,-44.4C-41.3,-62.8,-20.7,-76.2,-0.7,-75.6C19.2,-75,38.4,-60.4,48.3,-43.3Z"
                  />
                </g>
                <image
                  href="/Image/myself.jpg"
                  x="-5"
                  y="22"
                  width="200"
                  height="200"
                  clipPath="url(#avatarClip)"
                  className="transition-transform duration-700 hover:scale-110"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
