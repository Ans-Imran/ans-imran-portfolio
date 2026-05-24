const SKILL_GROUPS = [
  {
    label: "LCA & Modelling",
    tags: ["OpenLCA", "SimaPro", "GaBi", "ecoinvent 3.9.1", "ReCiPe Midpoint (H)", "ISO 14040/44/67", "PCF", "LCC", "EPD"],
  },
  {
    label: "Sustainability Reporting",
    tags: ["CSRD/ESRS", "EU Taxonomy", "Double Materiality", "ESG Compliance", "EIA/IEE"],
  },
  {
    label: "Data & Tools",
    tags: ["Power BI", "Python", "SQL", "Tableau", "SAP (basic)"],
  },
  {
    label: "Laboratory",
    tags: ["AAS", "HPLC", "Environmental Sampling", "Acid Digestion"],
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — story */}
          <div className="fade-up">
            <h2 className="text-2xl font-bold text-text-main mb-6">About</h2>
            <div className="space-y-4 text-base text-text-secondary leading-relaxed">
              <p>
                I&apos;m an environmental scientist who specialises in Life Cycle Assessment —
                the methodology behind credible sustainability claims.
              </p>
              <p>
                My hands-on experience comes from the EU Horizon Europe project <strong className="text-text-main">PVT4EU</strong>,
                where I conducted cradle-to-cradle LCA of novel photovoltaic-thermal
                collectors, co-authored an official EU deliverable reviewed by project
                officers, and published in Energy Proceedings (2025).
              </p>
              <p>
                I&apos;m certified in <strong className="text-text-main">CSRD, ESRS, and EU Taxonomy</strong> — the regulatory frameworks
                that are reshaping how Swedish companies report sustainability.
              </p>
              <p>
                Currently based in Gothenburg. English C1. Swedish advancing at SFI.{" "}
                <strong className="text-primary">Available immediately.</strong>
              </p>
            </div>
          </div>

          {/* Right — skills */}
          <div className="fade-up">
            <h2 className="text-2xl font-bold text-text-main mb-6">Skills</h2>
            <div className="space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {group.label}
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
