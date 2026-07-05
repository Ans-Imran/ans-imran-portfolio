"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

export function Nav() {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const NAV_LINKS = [
    { href: "#home",         label: tx(t.nav.home,         lang) },
    { href: "#about",        label: tx(t.nav.about,        lang) },
    { href: "#tools",        label: tx(t.nav.tools,        lang) },
    { href: "#publications", label: tx(t.nav.publications, lang) },
    { href: "#contact",      label: tx(t.nav.contact,      lang) },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "tools", "publications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Language toggle pills — forest green active, white border inactive */
  const LangToggle = () => (
    <div className="flex items-center gap-1 ml-3 shrink-0">
      {(["en", "sv"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={[
            "px-2 py-0.5 rounded-full text-xs font-semibold transition-colors border",
            lang === l
              ? "bg-[#15803d] text-white border-[#15803d]"
              : "bg-white text-[#15803d] border-[#15803d] hover:bg-green-50",
          ].join(" ")}
        >
          {l === "en" ? "EN" : "SV"}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-white border-b border-gray-100 shadow-sm" : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo + language toggle side-by-side */}
          <div className="flex items-center shrink-0">
            <a href="#home" className="text-primary font-bold text-base tracking-tight">
              Ans Imran Shahid
            </a>
            <LangToggle />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={[
                  "nav-link text-sm font-medium transition-colors pb-0.5",
                  activeSection === link.href.slice(1)
                    ? "text-primary active"
                    : "text-text-secondary hover:text-text-main",
                ].join(" ")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-semibold text-primary bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              {tx(t.nav.openToWork, lang)}
            </span>
            <a
              href="/cv.pdf"
              download="Ans_Imran_Shahid_CV.pdf"
              className="btn-scale text-sm font-medium border border-primary text-primary px-4 py-1.5 rounded-lg hover:bg-primary-light transition-colors"
            >
              {tx(t.nav.downloadCv, lang)}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-main"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="12" x2="19" y2="12" />
              <line x1="3" y1="18" x2="19" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="flex justify-between items-center px-6 h-16 border-b border-gray-100">
            {/* Name + toggle on same row mobile */}
            <div className="flex items-center">
              <span className="text-primary font-bold">Ans Imran Shahid</span>
              <LangToggle />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-text-secondary"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-0 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-xl font-semibold text-text-main border-b border-gray-50 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-6 mt-4 flex flex-col gap-3">
            <span className="text-sm font-semibold text-primary bg-green-50 border border-green-200 px-3 py-2 rounded-full text-center">
              {tx(t.nav.openToWorkFull, lang)}
            </span>
            <a
              href="/cv.pdf"
              download="Ans_Imran_Shahid_CV.pdf"
              className="btn-scale text-center text-base font-medium border-2 border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary-light transition-colors"
            >
              {tx(t.nav.downloadCv, lang)}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
