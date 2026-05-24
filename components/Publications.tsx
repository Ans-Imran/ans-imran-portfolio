const PUBLICATIONS = [
  {
    num: 1,
    authors: "Pazminno, I.A., Mousa, B.H., Shahid, A.I., Roch, E., Gomes, J. (2025).",
    title: "Comparative Analysis of Global Warming Potential and Energy Payback Time for Innovative Photovoltaic-Thermal Technologies.",
    venue: "Energy Proceedings, Vol. 61.",
    links: [
  {
    label: "URN",
    href: "https://urn.kb.se/resolve?urn=urn:nbn:se:hig:diva-49646",
  },
  {
    label: "OAI",
    href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2:2052792",
  },
  {
    label: "DiVA ID",
    href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2:2052792",
  },
],
       type: "Journal article",
  },
  {
    num: 2,
    authors: "Fatima, I., Fatima, A., Shah, I.A., Ejaz, I., et al., Shahid, A.I. (2024).",
    title: "Individual and synergistic effects of different fertilizers and gibberellin on growth and morphology of chili seedlings.",
    venue: "Ecological Frontiers, 44(2), 275–281.",
    doi: "10.1016/j.chnaes.2023.06.003",
    doiUrl: "https://doi.org/10.1016/j.chnaes.2023.06.003",
    type: "Journal article",
  },
  {
    num: 3,
    authors: "Shahid, A.I. (2025).",
    title: "Standard Operating Procedure for Life Cycle Assessment — aligned with ISO 14001/14040/14044/14048.",
    venue: "MG Sustainable Engineering AB.",
    note: "Peer-reviewed internal standard",
    doi: null,
    doiUrl: null,
    type: "SOP / Technical document",
  },
];

export function Publications() {
  return (
    <section id="publications" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text-main mb-8 fade-up">
          Publications & Scientific Output
        </h2>

        <ol className="space-y-6">
          {PUBLICATIONS.map((pub) => (
            <li key={pub.num} className="fade-up flex gap-4">
              <span className="text-2xl font-bold text-gray-200 tabular-nums shrink-0 select-none leading-tight mt-0.5">
                {pub.num}.
              </span>
              <div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="text-text-main">{pub.authors}</span>{" "}
                  <em className="not-italic font-semibold text-text-main">{pub.title}</em>{" "}
                  {pub.venue}
                  {pub.note && (
                    <span className="ml-1 text-xs bg-green-100 text-primary font-semibold px-2 py-0.5 rounded-full">
                      {pub.note}
                    </span>
                  )}
                </p>
                {pub.doiUrl ? (
                  <a
                    href={pub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5 font-medium"
                  >
                    DOI: {pub.doi} →
                  </a>
                ) : (
                  <span className="inline-block text-xs text-text-secondary mt-1.5 italic">
                    Available on request
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 pt-6 border-t border-gray-200 fade-up">
          <a
            href="https://orcid.org/0009-0009-0434-7988"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <span className="font-bold text-[#A6CE39]">iD</span>
            <span>ORCID: 0009-0009-0434-7988 →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Publications;
