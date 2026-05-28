"use client";

import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

const SKILL_GROUPS = [
  {
    labelKey: "lcaModelling" as const,
    tags: ["OpenLCA", "SimaPro", "GaBi", "ecoinvent 3.9.1", "ReCiPe Midpoint (H)", "ISO 14040/44/67", "PCF", "LCC", "EPD"],
  },
  {
    labelKey: "sustainabilityReport" as const,
    tags: ["CSRD/ESRS", "EU Taxonomy", "Double Materiality", "ESG Compliance", "EIA/IEE"],
  },
  {
    labelKey: "dataTools" as const,
    tags: ["Power BI", "Python", "SQL", "Tableau", "SAP (basic)"],
  },
  {
    labelKey: "laboratory" as const,
    tags: ["AAS", "HPLC", "Environmental Sampling", "Acid Digestion"],
  },
];

export function About() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — story */}
          <div className="fade-up">
            <h2 className="text-2xl font-bold text-text-main mb-6">{tx(t.about.heading, lang)}</h2>
            <div className="space-y-4 text-base text-text-secondary leading-relaxed">
              <p>{tx(t.about.bio.p1, lang)}</p>
              <p>
                {lang === "sv" ? (
                  <>
                    Min praktiska erfarenhet kommer från EU Horizon Europe-projektet{" "}
                    <strong className="text-text-main">PVT4EU</strong>,{" "}
                    där jag genomförde en vagga-till-vagga-LCA av nya solpanelskollektorer,
                    var medförfattare till ett officiellt EU-leveransdokument granskat av projektansvariga
                    samt publicerade i Energy Proceedings (2025).
                  </>
                ) : (
                  <>
                    My hands-on experience comes from the EU Horizon Europe project{" "}
                    <strong className="text-text-main">PVT4EU</strong>,
                    where I conducted cradle-to-cradle LCA of novel photovoltaic-thermal
                    collectors, co-authored an official EU deliverable reviewed by project
                    officers, and published in Energy Proceedings (2025).
                  </>
                )}
              </p>
              <p>
                {lang === "sv" ? (
                  <>
                    Jag är certifierad inom{" "}
                    <strong className="text-text-main">CSRD, ESRS och EU-taxonomin</strong>{" "}
                    — de regelramverk som förändrar hur svenska företag rapporterar hållbarhet.
                  </>
                ) : (
                  <>
                    I&apos;m certified in{" "}
                    <strong className="text-text-main">CSRD, ESRS, and EU Taxonomy</strong>{" "}
                    — the regulatory frameworks that are reshaping how Swedish companies report sustainability.
                  </>
                )}
              </p>
              <p>
                {tx(t.about.bio.p4, lang)}{" "}
                <strong className="text-primary">{tx(t.about.bio.available, lang)}</strong>
              </p>
            </div>
          </div>

          {/* Right — skills */}
          <div className="fade-up">
            <h2 className="text-2xl font-bold text-text-main mb-6">{tx(t.about.skills, lang)}</h2>
            <div className="space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.labelKey}>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {tx(t.about.skillGroups[group.labelKey], lang)}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
