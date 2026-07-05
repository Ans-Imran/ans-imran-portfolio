"use client";

import { useLanguage } from "@/lib/language-context";
import { tx } from "@/lib/translations";
import { useContent } from "@/lib/content-context";

export function FeaturedProject() {
  const { lang } = useLanguage();
  const t = useContent();

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text-main mb-6 fade-up">{tx(t.featured.heading, lang)}</h2>

        <div className="fade-up rounded-xl border border-gray-100 shadow-sm bg-primary-light overflow-hidden" style={{ borderLeft: "4px solid #15803d" }}>
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="shrink-0 mt-0.5">
                <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="22" rx="2" fill="#003399" />
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const cx = 16 + 7 * Math.cos(angle - Math.PI / 2);
                    const cy = 11 + 7 * Math.sin(angle - Math.PI / 2);
                    return <polygon key={i} points={`${cx},${cy - 1.8} ${cx + 0.5},${cy - 0.6} ${cx + 1.9},${cy - 0.6} ${cx + 0.8},${cy + 0.4} ${cx + 1.2},${cy + 1.8} ${cx},${cy + 0.9} ${cx - 1.2},${cy + 1.8} ${cx - 0.8},${cy + 0.4} ${cx - 1.9},${cy - 0.6} ${cx - 0.5},${cy - 0.6}`} fill="#FFCC00" />;
                  })}
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                  {lang === "sv" ? "EU Horizon Europe · PVT4EU (CETP-2022-00403)" : "EU Horizon Europe · PVT4EU (CETP-2022-00403)"}
                </div>
                <h3 className="text-lg font-bold text-text-main leading-snug">
                  {lang === "sv"
                    ? "Livscykelanalys av innovativa fotovoltaisk-termiska kollektorer"
                    : "Life Cycle Assessment of Novel Photovoltaic-Thermal Collectors"}
                </h3>
              </div>
            </div>

            {/* Meta */}
            <div className="grid sm:grid-cols-3 gap-3 mb-5 text-sm">
              <div>
                <span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">{tx(t.featured.role, lang)}</span>
                <div className="text-text-main font-medium">{lang === "sv" ? "Miljöingenjör (praktikant)" : "Environmental Engineer (Intern)"}</div>
              </div>
              <div>
                <span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">{tx(t.featured.org, lang)}</span>
                <div className="text-text-main font-medium">MG Sustainable Engineering AB, Uppsala</div>
              </div>
              <div>
                <span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">{tx(t.featured.period, lang)}</span>
                <div className="text-text-main font-medium">{lang === "sv" ? "Februari – juni 2025" : "February – June 2025"}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {lang === "sv" ? (
                <>
                  Genomförde vagga-till-vagga-LCA och livscykelkostnadsanalys av två nya PVT-kollektorprototyper
                  inom EU Horizon Europe-forskningsprogrammet.
                  Medförfattade <strong className="text-text-main">EU-leveransdokument D6.2</strong> — ett officiellt
                  projektresultat granskat av EU-projektansvariga som direkt informerade FoU-besluten för Version 2.
                </>
              ) : (
                <>
                  Conducted cradle-to-cradle LCA and Life Cycle Costing of two novel PVT
                  collector prototypes under the EU Horizon Europe research programme.
                  Co-authored <strong className="text-text-main">EU Deliverable D6.2</strong> — an official project output reviewed
                  by EU project officers and directly informing Version 2 R&amp;D decisions.
                </>
              )}
            </p>

            {/* Key results */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">{tx(t.featured.keyResults, lang)}</div>
              <ul className="space-y-1.5">
                {(lang === "sv" ? [
                  "PCF: 16,6–23,9 kg CO₂-ekv/m² för två kollektordesigner",
                  "EPBT: 1,0–1,4 år (V1 PVT-SP) vs 6,3 år (V1 PVT-MG)",
                  "100+ komponenter modellerade över hela livscykeln inklusive 4 sluthanteringsscenarier",
                  "Ensam författare av ISO-anpassad LCA Standard Operating Procedure",
                ] : [
                  "PCF: 16.6–23.9 kg CO₂-eq/m² across two collector designs",
                  "EPBT: 1.0–1.4 years (V1 PVT-SP) vs 6.3 years (V1 PVT-MG)",
                  "100+ components modelled across full lifecycle including 4 EoL scenarios",
                  "Sole author of ISO-aligned LCA Standard Operating Procedure",
                ]).map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a href="https://urn.kb.se/resolve?urn=urn%3Anbn%3Ase%3Ahig%3Adiva-49646" target="_blank" rel="noopener noreferrer" className="btn-scale text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-white transition-colors">
                {tx(t.featured.peerPub, lang)}
              </a>
              <a href="https://pvt4eu.eu/" target="_blank" rel="noopener noreferrer" className="btn-scale text-sm font-medium text-text-secondary border border-gray-200 bg-white px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors">
                {tx(t.featured.projectLink, lang)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProject;
