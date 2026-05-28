"use client";

import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

const CERTS = [
  {
    groupKey: "csrd" as const,
    provider: "Greenomy Academy / Position Green",
    items_en: [
      "CSRD & ESRS for Corporates",
      "Double Materiality Assessment",
      "EU Taxonomy & Sustainable Finance",
      "Voluntary ESRS for SMEs",
      "Gap Analysis for CSRD Reporting",
    ],
    items_sv: [
      "CSRD och ESRS för företag",
      "Dubbel väsentlighetsbedömning",
      "EU-taxonomin och hållbar finansiering",
      "Frivillig ESRS för SMF",
      "Gapanalys för CSRD-rapportering",
    ],
  },
  {
    groupKey: "data" as const,
    provider: "Google / Cisco / OpenEDG",
    items_en: [
      "Google Data Analytics Professional Certificate",
      "Python Essentials 1 — Cisco / OpenEDG",
    ],
    items_sv: [
      "Google Data Analytics Professional Certificate",
      "Python Essentials 1 — Cisco / OpenEDG",
    ],
  },
];

export function Education() {
  const { lang } = useLanguage();

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text-main mb-8 fade-up">
          {tx(t.education.heading, lang)}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Education */}
          <div className="fade-up">
            <h3 className="text-base font-semibold text-text-main mb-5">{tx(t.education.education, lang)}</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-sm font-bold text-text-main">
                  {lang === "sv" ? "MS Miljövetenskap" : "MS Environmental Sciences"}
                </div>
                <div className="text-sm text-text-secondary mt-0.5">
                  {lang === "sv" ? "University of the Punjab" : "University of the Punjab"}
                </div>
                <div className="text-xs text-text-secondary mt-0.5">2018 – 2020 · CGPA 3.68 / 4.00</div>
                <div className="text-xs text-primary mt-1 font-medium">
                  {tx(t.education.thesis, lang)}{" "}
                  {lang === "sv" ? "Återvinning av ädelmetaller från e-avfall" : "Precious Metal Recovery from E-Waste"}
                </div>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="text-sm font-bold text-text-main">
                  {lang === "sv" ? "BS Miljövetenskap" : "BS Environmental Sciences"}
                </div>
                <div className="text-sm text-text-secondary mt-0.5">University of the Punjab</div>
                <div className="text-xs text-text-secondary mt-0.5">2014 – 2018 · CGPA 3.06 / 4.00</div>
                <div className="text-xs text-primary mt-1 font-medium">
                  {tx(t.education.thesis, lang)}{" "}
                  {lang === "sv" ? "Tungmetalltoxicitet hos fisk, Mangla-dammen" : "Heavy Metal Toxicity in Fish, Mangla Dam"}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Certifications */}
          <div className="fade-up">
            <h3 className="text-base font-semibold text-text-main mb-5">{tx(t.education.certifications, lang)}</h3>
            <div className="space-y-5">
              {CERTS.map((cert) => (
                <div key={cert.groupKey}>
                  <div className="text-xs font-bold text-text-main mb-0.5">
                    {tx(t.education.certGroups[cert.groupKey], lang)}
                  </div>
                  <div className="text-xs text-text-secondary mb-2 italic">{cert.provider}</div>
                  <ul className="space-y-1">
                    {(lang === "sv" ? cert.items_sv : cert.items_en).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-primary shrink-0 text-xs mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
