"use client";

import { SharedToolNav } from "@/components/SharedToolNav";
import { useLanguage } from "@/lib/language-context";

/**
 * Client wrapper that wires the SharedToolNav language toggle
 * into the LanguageContext. Rendered at the top of the page.
 */
export function ToolNavBar() {
  const { lang, setLang } = useLanguage();
  return (
    <SharedToolNav
      currentTool="portfolio"
      lang={lang}
      onLangChange={setLang}
    />
  );
}

export default ToolNavBar;
