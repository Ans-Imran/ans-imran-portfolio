"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/translations";

interface LanguageContextValue {
  lang:    Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang:    "en",
  setLang: () => {},
});

export function LanguageProvider({
  children,
  defaultLang = "en",
}: {
  children:    ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    // 1. Check localStorage preference
    try {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored === "en" || stored === "sv") {
        setLangState(stored);
        return;
      }
    } catch { /* SSR / privacy mode */ }

    // 2. Fall back to browser language detection
    try {
      const browserLang = navigator.language?.toLowerCase() ?? "";
      if (browserLang.startsWith("sv")) {
        setLangState("sv");
      }
    } catch { /* noop */ }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch { /* noop */ }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
