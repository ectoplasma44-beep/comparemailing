"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Outils", href: "/outils" },
  { label: "Comparatifs", href: "/comparatifs" },
  { label: "Alternatives", href: "/alternative/mailchimp" },
  { label: "Par profil", href: "/meilleur-emailing/freelance" },
  { label: "Quiz", href: "/quiz" },
  { label: "Simulateur", href: "/simulateur-cout" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 flex items-center gap-0.5">
          ToolPick<span style={{ color: "#4F46E5" }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/quiz"
            className="hidden md:inline-flex items-center px-3 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Quel outil pour moi&nbsp;?
          </Link>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-700 hover:text-gray-900 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="mt-1 inline-flex items-center justify-center px-3 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Quel outil pour moi&nbsp;?
          </Link>
        </div>
      )}
    </header>
  );
}
