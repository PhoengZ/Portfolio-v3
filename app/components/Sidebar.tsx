"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaBriefcase, FaCertificate, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/about", label: "About", icon: FaUser },
    { href: "/projects", label: "Projects", icon: FaBriefcase },
    { href: "/certificates", label: "Certificates", icon: FaCertificate },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-blue-500 text-white rounded-md focus:outline-none drop-shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed md:relative top-0 left-0 h-screen bg-linear-to-b from-blue-500 to-blue-600 text-white shadow-2xl transition-all duration-300 ease-in-out z-40 ${
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${isHovered ? "md:w-64" : "md:w-20"}`}
      >
        <div className="flex flex-col h-full py-8">
          {/* Logo or Top Icon */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
              PK
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"
                  }`}
                  title={link.label}
                >
                  <div className="flex items-center justify-center min-w-[24px]">
                    <link.icon className={`w-6 h-6 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  </div>
                  <span
                    className={`ml-4 font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      isHovered || isMobileOpen ? "opacity-100 max-w-xs" : "md:opacity-0 md:max-w-0"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
