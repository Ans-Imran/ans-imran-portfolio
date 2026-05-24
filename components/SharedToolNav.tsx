"use client";

import { useState, useEffect, useRef } from "react";

interface Tool {
  id: string;
  slug: string;
  name_en: string;
  name_sv: string;
  url: string;
  icon: string;
  color: string;
  display_order: number;
  active: boolean;
  coming_soon: boolean;
}

interface SharedToolNavProps {
  currentTool: string;
  lang: "en" | "sv";
  onLangChange?: (lang: "en" | "sv") => void;
  tools?: Tool[];
}

const FALLBACK_TOOLS: Tool[] = [
  { id: "1", slug: "lca-planner",      name_en: "LCA Project Planner",     name_sv: "LCA Projektplanerare",            url: "https://lca-project-planner.vercel.app",    icon: "📋", color: "#15803d", display_order: 1, active: true, coming_soon: false },
  { id: "2", slug: "carbon-hotspot",   name_en: "Carbon Hotspot Finder",   name_sv: "Koldioxidhotspot-finder",         url: "https://carbon-hotspot-finder.vercel.app",  icon: "🔍", color: "#dc2626", display_order: 2, active: true, coming_soon: false },
  { id: "3", slug: "scope3-simulator", name_en: "Scope 3 Simulator",       name_sv: "Scope 3 Simulator",               url: "https://scope3-simulator.vercel.app",        icon: "📊", color: "#7c3aed", display_order: 3, active: true, coming_soon: false },
  { id: "4", slug: "csrd-checker",     name_en: "CSRD Compliance Checker", name_sv: "CSRD Regelefterlevnadskontroll",  url: "https://csrd-compliance-checker.vercel.app", icon: "✅", color: "#0369a1", display_order: 4, active: true, coming_soon: false },
  { id: "5", slug: "ecotox-scout",     name_en: "EcoTox Scout",            name_sv: "EkoTox Scout",                    url: "https://ecotox-scout.vercel.app",            icon: "🧪", color: "#b45309", display_order: 5, active: true, coming_soon: true  },
];

export function SharedToolNav({ currentTool, lang, onLangChange, tools: prefetchedTools }: SharedToolNavProps) {
  const [tools, setTools] = useState<Tool[]>(prefetchedTools ?? FALLBACK_TOOLS);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefetchedTools && prefetchedTools.length > 0) return;
    fetch("/api/tools")
      .then((r) => r.ok ? r.json() as Promise<Tool[]> : Promise.reject())
      .then((data) => { if (data?.length) setTools(data); })
      .catch(() => { /* keep fallback */ });
  }, [prefetchedTools]);

  function handleComingSoonHover(name: string) {
    setTooltip(name);
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => setTooltip(null), 2000);
  }

  const activeTools = tools
    .filter((t) => t.active)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <nav aria-label="Tool suite navigation" style={{ backgroundColor: "#15803d" }} className="w-full">
      <div className="max-w-6xl mx-auto px-3 flex items-center">
        <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide py-1 min-w-0">
          {activeTools.map((tool) => {
            const isCurrent = tool.slug === currentTool;
            const name = lang === "sv" ? tool.name_sv : tool.name_en;
            if (tool.coming_soon) {
              return (
                <div key={tool.slug} className="relative shrink-0">
                  <button
                    type="button"
                    aria-label={`${name} — Coming soon`}
                    onMouseEnter={() => handleComingSoonHover(name)}
                    onFocus={() => handleComingSoonHover(name)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-green-300 opacity-50 cursor-not-allowed select-none whitespace-nowrap"
                  >
                    <span>{tool.icon}</span>
                    <span>{name}</span>
                    <span className="text-xs bg-green-800 text-green-200 px-1.5 py-0.5 rounded-full ml-0.5">Soon</span>
                  </button>
                  {tooltip === name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                      Coming soon!
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={tool.slug}
                href={tool.url}
                target={isCurrent ? undefined : "_blank"}
                rel={isCurrent ? undefined : "noopener noreferrer"}
                aria-current={isCurrent ? "page" : undefined}
                className={[
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap shrink-0 transition-colors",
                  isCurrent
                    ? "bg-white/20 text-white font-semibold"
                    : "text-green-100 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <span>{tool.icon}</span>
                <span>{name}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 shrink-0" />}
              </a>
            );
          })}
        </div>
        {onLangChange && (
          <div className="shrink-0 ml-2 pl-2 border-l border-green-600 flex items-center gap-0.5">
            {(["en", "sv"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onLangChange(l)}
                aria-pressed={lang === l}
                className={["px-2 py-1 rounded text-xs font-semibold uppercase transition-colors", lang === l ? "bg-white text-green-800" : "text-green-200 hover:text-white"].join(" ")}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default SharedToolNav;
