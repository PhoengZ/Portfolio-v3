"use client";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/certificates", label: "Certificates" },
  ];

  return (
    <>
      <nav className="bg-linear-to-r from-blue-400 to-blue-500 sticky top-0 z-50 py-4 md:py-6 px-2 drop-shadow-2xl">
        <div className="flex justify-between items-center px-5 mx-auto">
          <div className="max-w-fit">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <FaHome className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-bold text-lg transition-all duration-200 hover:text-white hover:scale-110 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 w-full bg-blue-500 border-t border-blue-400 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-fit py-6 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-xl text-white transition-all duration-200 hover:scale-110"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
