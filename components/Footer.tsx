"use client";

import { useLanguage } from "@/lib/language-context";
import { tx } from "@/lib/translations";
import { useContent } from "@/lib/content-context";

export function Footer() {
  const { lang } = useLanguage();
  const t = useContent();

  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-sm text-text-secondary text-center sm:text-left">
            <span className="font-semibold text-text-main">Ans Imran Shahid</span>
            {" · "}{tx(t.footer.role, lang)}{" · "}{tx(t.footer.location, lang)}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/ans-imran" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors text-sm">LinkedIn</a>
            <a href="https://orcid.org/0009-0009-0434-7988" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors text-sm">ORCID</a>
            <a href="mailto:ansimran300@gmail.com" className="text-text-secondary hover:text-primary transition-colors text-sm">{lang === "sv" ? "E-post" : "Email"}</a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          © 2026 · {tx(t.footer.built, lang)}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
