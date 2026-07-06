"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/lib/language-context";
import { tx } from "@/lib/translations";
import { useContent } from "@/lib/content-context";

type TabKey = "carbon" | "scope3" | "csrd" | "planner";

/* ── Carbon Hotspot demo ── */
const HOTSPOT_PRODUCTS = [
  "Laptop", "T-shirt", "Beef burger", "Electric car", "Solar panel",
  "Concrete block", "Glass bottle", "Aluminium can", "Cotton jeans", "Smartphone",
] as const;
type HotspotProduct = typeof HOTSPOT_PRODUCTS[number];

const HOTSPOT_DATA: Record<HotspotProduct, { stage_en: string; stage_sv: string; pct: number; color: string }[]> = {
  "Laptop":         [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 45, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 20, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 5,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 25, color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 5,  color: "#86efac" }],
  "T-shirt":        [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 60, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 15, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 8,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 10, color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 7,  color: "#86efac" }],
  "Beef burger":    [{ stage_en: "Farming",        stage_sv: "Jordbruk",       pct: 85, color: "#15803d" }, { stage_en: "Processing",    stage_sv: "Bearbetning",   pct: 5,  color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 5,  color: "#22c55e" }, { stage_en: "Retail",       stage_sv: "Detaljhandel",  pct: 3,  color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 2,  color: "#86efac" }],
  "Electric car":   [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 35, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 30, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 3,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 25, color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 7,  color: "#86efac" }],
  "Solar panel":    [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 50, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 38, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 4,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 3,  color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 5,  color: "#86efac" }],
  "Concrete block": [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 70, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 22, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 5,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 2,  color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 1,  color: "#86efac" }],
  "Glass bottle":   [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 40, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 45, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 8,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 5,  color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 2,  color: "#86efac" }],
  "Aluminium can":  [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 75, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 18, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 4,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 1,  color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 2,  color: "#86efac" }],
  "Cotton jeans":   [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 55, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 18, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 7,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 15, color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 5,  color: "#86efac" }],
  "Smartphone":     [{ stage_en: "Raw materials",  stage_sv: "Råmaterial",     pct: 50, color: "#15803d" }, { stage_en: "Manufacturing", stage_sv: "Tillverkning",  pct: 25, color: "#16a34a" }, { stage_en: "Transport",    stage_sv: "Transport",     pct: 4,  color: "#22c55e" }, { stage_en: "Use phase",    stage_sv: "Användningsfas",pct: 18, color: "#4ade80" }, { stage_en: "End of life",  stage_sv: "Sluthantering", pct: 3,  color: "#86efac" }],
};

function CarbonHotspotDemo({ lang }: { lang: "en" | "sv" }) {
  const t = useContent();
  const [product, setProduct] = useState<HotspotProduct>("Laptop");
  const [animated, setAnimated] = useState(false);

  const data = HOTSPOT_DATA[product];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
          {tx(t.tools.selectProduct, lang)}
        </label>
        <select
          value={product}
          onChange={(e) => { setProduct(e.target.value as HotspotProduct); setAnimated(false); setTimeout(() => setAnimated(true), 100); }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100"
        >
          {HOTSPOT_PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        {data.map((row) => (
          <div key={row.stage_en}>
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{lang === "sv" ? row.stage_sv : row.stage_en}</span>
              <span className="font-semibold text-text-main">{row.pct}%</span>
            </div>
            <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bar-fill h-full rounded-full"
                style={{ width: animated ? `${row.pct}%` : "0%", backgroundColor: row.color, transitionDelay: `${data.indexOf(row) * 80}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-secondary italic">
        {tx(t.tools.hotspotNote, lang)}: <strong className="text-text-main">{lang === "sv" ? data[0].stage_sv : data[0].stage_en}</strong> ({data[0].pct}% {tx(t.tools.ofLifecycle, lang)})
      </p>
    </div>
  );
}

/* ── Scope 3 demo ── */
function calcScope3(employees: number, revenue: number, lang: "en" | "sv") {
  const cat1  = Math.round(((revenue * 0.55) + (employees * 0.05)) * 10) / 10;
  const cat7  = Math.round((employees * 0.12) * 10) / 10;
  const cat11 = Math.round(((revenue * 0.18) + (employees * 0.02)) * 10) / 10;
  const other = Math.round(((revenue * 0.27) + (employees * 0.08)) * 10) / 10;
  const total = cat1 + cat7 + cat11 + other;
  return [
    { label: lang === "sv" ? "Kat 1 · Inköpta varor"  : "Cat 1 · Purchased goods", pct: Math.round((cat1  / total) * 100), color: "#15803d" },
    { label: lang === "sv" ? "Kat 7 · Pendling"       : "Cat 7 · Commuting",        pct: Math.round((cat7  / total) * 100), color: "#16a34a" },
    { label: lang === "sv" ? "Kat 11 · Produktanvändning" : "Cat 11 · Use of products", pct: Math.round((cat11 / total) * 100), color: "#22c55e" },
    { label: lang === "sv" ? "Övriga kategorier"      : "Other categories",          pct: Math.round((other / total) * 100), color: "#bbf7d0" },
  ];
}

function DonutChart({ segments }: { segments: { label: string; pct: number; color: string }[] }) {
  const cx = 60; const cy = 60; const r = 45; const gap = 3;
  let cumAngle = -90;
  const paths: { d: string; color: string; label: string; pct: number }[] = [];
  segments.forEach((seg) => {
    const startAngle = cumAngle;
    const sweep = (seg.pct / 100) * 360 - gap;
    const endAngle = startAngle + sweep;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle)); const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));   const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;
    paths.push({ d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, color: seg.color, label: seg.label, pct: seg.pct });
    cumAngle += sweep + gap;
  });
  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
        <circle cx={cx} cy={cy} r="28" fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111827">Scope 3</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize="9" fill="#6b7280">estimate</text>
      </svg>
      <div className="space-y-1.5 flex-1 min-w-0">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: seg.color }} />
            <span className="text-text-secondary truncate">{seg.label}</span>
            <span className="ml-auto font-semibold text-text-main">{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scope3Demo({ lang }: { lang: "en" | "sv" }) {
  const t = useContent();
  const [employees, setEmployees] = useState(50);
  const [revenue, setRevenue]     = useState(25);
  const segments = calcScope3(employees, revenue, lang);
  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <label className="font-semibold uppercase tracking-wide">{tx(t.tools.employees, lang)}</label>
          <span className="font-bold text-text-main">{employees}</span>
        </div>
        <input type="range" min={10} max={500} step={10} value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full" aria-label="Employees" />
        <div className="flex justify-between text-xs text-gray-300 mt-0.5"><span>10</span><span>500</span></div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <label className="font-semibold uppercase tracking-wide">{tx(t.tools.revenue, lang)}</label>
          <span className="font-bold text-text-main">{revenue}</span>
        </div>
        <input type="range" min={5} max={500} step={5} value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full" aria-label="Revenue" />
        <div className="flex justify-between text-xs text-gray-300 mt-0.5"><span>5 MSEK</span><span>500 MSEK</span></div>
      </div>
      <DonutChart segments={segments} />
      <p className="text-xs text-text-secondary italic">{tx(t.tools.materialCategories, lang)}</p>
    </div>
  );
}

/* ── CSRD demo ── */
function checkCSRD(employees: number, listed: boolean) {
  if (listed && employees >= 1) return { year: 2024, wave: "Wave 1", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS E2", "ESRS S1", "ESRS G1"] };
  if (employees >= 500)         return { year: 2025, wave: "Wave 2", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS S1", "ESRS G1"] };
  if (employees >= 250)         return { year: 2026, wave: "Wave 3", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS G1"] };
  if (employees >= 50)          return { year: 2027, wave: "Wave 4 (SME)", standards: ["ESRS for SMEs (voluntary)"] };
  return null;
}

function CSRDDemo({ lang }: { lang: "en" | "sv" }) {
  const t = useContent();
  const [employees, setEmployees] = useState<string>("300");
  const [listed, setListed]       = useState(false);
  const emp = parseInt(employees) || 0;
  const result = checkCSRD(emp, listed);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
            {lang === "sv" ? "Anställda" : "Employees"}
          </label>
          <input type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100" placeholder="e.g. 300" min={1} />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
            {tx(t.tools.listedEu, lang)}
          </label>
          <button type="button" onClick={() => setListed((v) => !v)} className={["w-full py-2 px-3 rounded-lg text-sm font-medium border transition-colors", listed ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-gray-200 hover:border-primary"].join(" ")}>
            {listed ? tx(t.tools.yesListed, lang) : tx(t.tools.noPrivate, lang)}
          </button>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">{tx(t.tools.country, lang)}</label>
        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary">
          <option value="SE">🇸🇪 {lang === "sv" ? "Sverige" : "Sweden"}</option>
          <option value="NO">🇳🇴 {lang === "sv" ? "Norge" : "Norway"}</option>
          <option value="DE">🇩🇪 {lang === "sv" ? "Tyskland" : "Germany"}</option>
          <option value="FR">🇫🇷 {lang === "sv" ? "Frankrike" : "France"}</option>
        </select>
      </div>
      <div className={["rounded-lg p-3 border", result ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"].join(" ")}>
        {result ? (
          <>
            <div className="font-semibold text-sm text-green-800 mb-1">
              {tx(t.tools.csrdApplies, lang)} {result.year} ({result.wave})
            </div>
            <div className="text-xs text-green-700 mb-2">{tx(t.tools.csrdWave, lang)}</div>
            <div className="flex flex-wrap gap-1">
              {result.standards.map((s) => <span key={s} className="text-xs bg-white border border-green-200 text-green-700 px-2 py-0.5 rounded-full font-medium">{s}</span>)}
            </div>
          </>
        ) : (
          <div className="text-sm font-medium text-amber-800">{tx(t.tools.csrdNot, lang)}</div>
        )}
      </div>
      <p className="text-xs text-text-secondary italic">{tx(t.tools.csrdNote, lang)}</p>
    </div>
  );
}

/* ── Planner demo ── */
const LCA_PRODUCTS_EN = ["Physical product", "Energy system", "Service", "Building/infrastructure", "Food system"];
const LCA_PRODUCTS_SV = ["Fysisk produkt", "Energisystem", "Tjänst", "Byggnad/infrastruktur", "Livsmedelssystem"];

const TIMELINE_MAP: Record<string, Record<string, { weeks: string; cost: string; std: string }>> = {
  "Physical product":       { "Cradle-to-gate": { weeks: "4-6",   cost: "40,000–80,000",  std: "ISO 14040/44" }, "Cradle-to-grave": { weeks: "6-10",  cost: "70,000–120,000", std: "ISO 14040/44 + ISO 14067" }, "Cradle-to-cradle": { weeks: "8-14", cost: "90,000–150,000", std: "ISO 14040/44 + circular LCA" } },
  "Energy system":          { "Cradle-to-gate": { weeks: "3-5",   cost: "35,000–65,000",  std: "ISO 14040/44" }, "Cradle-to-grave": { weeks: "5-9",  cost: "60,000–110,000", std: "ISO 14040/44" },             "Cradle-to-cradle": { weeks: "7-12", cost: "80,000–130,000", std: "ISO 14040/44 + EPBT" } },
  "Service":                { "Cradle-to-gate": { weeks: "3-5",   cost: "30,000–60,000",  std: "ISO 14040/44" }, "Cradle-to-grave": { weeks: "4-8",  cost: "50,000–90,000",  std: "ISO 14040/44" },             "Cradle-to-cradle": { weeks: "6-10", cost: "70,000–110,000", std: "ISO 14040/44" } },
  "Building/infrastructure":{ "Cradle-to-gate": { weeks: "6-10",  cost: "60,000–100,000", std: "ISO 14040/44 + EN 15978" }, "Cradle-to-grave": { weeks: "10-16", cost: "100,000–180,000", std: "ISO 14040/44 + EN 15978" }, "Cradle-to-cradle": { weeks: "14-20", cost: "140,000–220,000", std: "ISO 14040/44 + EN 15978" } },
  "Food system":            { "Cradle-to-gate": { weeks: "4-7",   cost: "40,000–75,000",  std: "ISO 14040/44 + PCF" }, "Cradle-to-grave": { weeks: "6-11", cost: "65,000–115,000", std: "ISO 14040/44 + ISO 14067" }, "Cradle-to-cradle": { weeks: "9-14", cost: "85,000–145,000", std: "ISO 14040/44 + ISO 14067" } },
};

const SCOPES_EN = ["Cradle-to-gate", "Cradle-to-grave", "Cradle-to-cradle"];
const SCOPES_SV = ["Vagga till grind", "Vagga till grav", "Vagga till vagga"];

function PlannerDemo({ lang }: { lang: "en" | "sv" }) {
  const t = useContent();
  const [step, setStep]             = useState(0);
  const [productType, setProductType] = useState("");
  const [scope, setScope]           = useState("");
  const [dataAvail, setDataAvail]   = useState("");
  const [showResult, setShowResult] = useState(false);
  const reset = () => { setStep(0); setProductType(""); setScope(""); setDataAvail(""); setShowResult(false); };

  const LCA_PRODUCTS = lang === "sv" ? LCA_PRODUCTS_SV : LCA_PRODUCTS_EN;
  const SCOPES       = lang === "sv" ? SCOPES_SV : SCOPES_EN;
  const productKey = LCA_PRODUCTS_SV.includes(productType)
    ? LCA_PRODUCTS_EN[LCA_PRODUCTS_SV.indexOf(productType)] ?? productType
    : productType;
  const scopeKey = SCOPES_SV.includes(scope)
    ? SCOPES_EN[SCOPES_SV.indexOf(scope)] ?? scope
    : scope;

  const result = productKey && scopeKey && TIMELINE_MAP[productKey]?.[scopeKey]
    ? TIMELINE_MAP[productKey][scopeKey]
    : { weeks: "4-8", cost: "50,000–100,000", std: "ISO 14040/44" };

  const DATA_OPTS_EN = ["Complete", "Partial", "Minimal"];
  const DATA_OPTS_SV = ["Komplett", "Partiell", "Minimal"];
  const DATA_OPTS = lang === "sv" ? DATA_OPTS_SV : DATA_OPTS_EN;
  const DATA_DESC_EN = ["all process data ready", "some data gaps", "need full data collection"];
  const DATA_DESC_SV = ["all processdata redo", "viss databrist", "behöver full datainsamling"];
  const DATA_DESC = lang === "sv" ? DATA_DESC_SV : DATA_DESC_EN;

  const dataIdx = DATA_OPTS.indexOf(dataAvail);
  const dataAdj = dataIdx === 0 ? -1 : dataIdx === 1 ? 0 : 2;
  const weekParts = result.weeks.split("-").map(Number);
  const adjWeeks = `${weekParts[0] + dataAdj}–${weekParts[1] + dataAdj}`;

  return (
    <div className="space-y-4 min-h-[220px]">
      {!showResult ? (
        <div className="tool-panel">
          <div className="flex items-center gap-1.5 mb-4">
            {[0,1,2].map((i) => <div key={i} className={["w-6 h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-gray-200"].join(" ")} />)}
            <span className="text-xs text-text-secondary ml-1">{tx(t.tools.stepOf, lang)} {step + 1} {tx(t.tools.of, lang)} 3</span>
          </div>
          {step === 0 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">{tx(t.tools.whatTypeProduct, lang)}</div>
              <div className="space-y-1.5">
                {LCA_PRODUCTS.map((p) => (
                  <button key={p} type="button" className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", productType === p ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")} onClick={() => { setProductType(p); setStep(1); }}>{p}</button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">{tx(t.tools.whatScope, lang)}</div>
              <div className="space-y-1.5">
                {SCOPES.map((s) => (
                  <button key={s} type="button" className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", scope === s ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")} onClick={() => { setScope(s); setStep(2); }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">{tx(t.tools.howComplete, lang)}</div>
              <div className="space-y-1.5">
                {DATA_OPTS.map((d, i) => (
                  <button key={d} type="button" className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", dataAvail === d ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")} onClick={() => { setDataAvail(d); setShowResult(true); }}>{d} — {DATA_DESC[i]}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="tool-panel">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
            <div className="text-sm font-bold text-primary">{tx(t.tools.yourLcaEstimate, lang)}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-xs text-text-secondary mb-0.5">{tx(t.tools.timeline, lang)}</div>
                <div className="text-base font-bold text-text-main">{adjWeeks} {tx(t.tools.weeks, lang)}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-xs text-text-secondary mb-0.5">{tx(t.tools.estCost, lang)}</div>
                <div className="text-base font-bold text-text-main">{result.cost}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-100">
              <div className="text-xs text-text-secondary mb-0.5">{tx(t.tools.recStandard, lang)}</div>
              <div className="text-sm font-semibold text-text-main">{result.std}</div>
            </div>
          </div>
          <button type="button" onClick={reset} className="mt-3 text-xs text-primary hover:underline">{tx(t.tools.tryAgain, lang)}</button>
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
const TOOL_KEYS: TabKey[] = ["carbon", "scope3", "csrd", "planner"];
const TOOL_LINKS = [
  "https://carbon-hotspot-finder.vercel.app",
  "https://scope3-simulator.vercel.app",
  "https://csrd-compliance-checker.vercel.app",
  "https://lca-project-planner.vercel.app",
];
const TOOL_ICONS = ["🔍", "📊", "✅", "📋"];
const TOOL_TECH = [
  ["Next.js", "TypeScript", "ecoinvent", "ISO 14067"],
  ["Next.js", "TypeScript", "GHG Protocol", "CSRD/ESRS"],
  ["Next.js", "TypeScript", "CSRD Directive", "ESRS"],
  ["Next.js", "TypeScript", "ISO 14040/44", "PostgreSQL"],
];

export interface RegTool { slug: string; name_en: string; name_sv: string; url: string; icon: string; display_order: number; }
const SLUG_BY_KEY: Record<TabKey, string> = { carbon: "carbon-hotspot", scope3: "scope3-simulator", csrd: "csrd-checker", planner: "lca-planner" };

export function ToolsShowcase({ registry = [] }: { registry?: RegTool[] }) {
  const { lang } = useLanguage();
  const t = useContent();
  const [activeTab, setActiveTab] = useState<TabKey>("carbon");
  const handleTabChange = useCallback((key: TabKey) => setActiveTab(key), []);

  // Registry (shared tools table) drives name/url/icon/order; hardcoded values are the fallback.
  const bySlug = new Map(registry.map((r) => [r.slug, r]));
  const meta = (key: TabKey) => {
    const i = TOOL_KEYS.indexOf(key);
    const r = bySlug.get(SLUG_BY_KEY[key]);
    return {
      name: r ? { en: r.name_en, sv: r.name_sv } : t.tools.tools[i].name,
      url: r?.url || TOOL_LINKS[i],
      icon: r?.icon || TOOL_ICONS[i],
      order: r?.display_order ?? i + 1,
    };
  };

  const visibility = (t as unknown as { toolsVisibility?: Record<string, boolean> }).toolsVisibility;
  const visibleKeys = TOOL_KEYS.filter((k) => visibility?.[k] !== false).sort((a, b) => meta(a).order - meta(b).order);
  if (visibleKeys.length === 0) return null;
  const effectiveTab: TabKey = visibleKeys.includes(activeTab) ? activeTab : visibleKeys[0];
  const activeIdx  = TOOL_KEYS.indexOf(effectiveTab);
  const toolData   = t.tools.tools[activeIdx];
  const activeMeta = meta(effectiveTab);

  return (
    <section id="tools" className="py-20 bg-primary-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 fade-up">
          <h2 className="text-2xl font-bold text-text-main mb-2">{tx(t.tools.heading, lang)}</h2>
          <p className="text-text-secondary">{tx(t.tools.subheading, lang)}</p>
        </div>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1 mb-6 fade-up">
          {visibleKeys.map((key) => {
            const m = meta(key);
            return (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={["flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0", effectiveTab === key ? "bg-primary text-white shadow-sm" : "bg-white text-text-secondary hover:text-text-main hover:bg-white/80 border border-gray-100"].join(" ")}
            >
              <span>{m.icon}</span>
              <span>{tx(m.name, lang)}</span>
            </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden fade-up">
          <div key={effectiveTab} className="tool-panel grid md:grid-cols-5 gap-0 min-h-[400px]">
            <div className="md:col-span-2 p-6 lg:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{activeMeta.icon}</span>
                <span className="text-base font-bold text-text-main">{tx(activeMeta.name, lang)}</span>
              </div>
              <div className="mb-4">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">{tx(t.tools.theProblem, lang)}</div>
                <p className="text-sm font-semibold text-text-main leading-snug">&ldquo;{tx(toolData.problem, lang)}&rdquo;</p>
              </div>
              <div className="mb-4">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">{tx(t.tools.theSolution, lang)}</div>
                <p className="text-sm text-text-secondary">{tx(toolData.solution, lang)}</p>
              </div>
              <ul className="space-y-1 mb-6 flex-1">
                {(lang === "sv" ? toolData.features.sv : toolData.features.en).map((f: string) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a href={activeMeta.url} target="_blank" rel="noopener noreferrer" data-track={`tool:${effectiveTab}`} className="btn-scale flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors">
                  {tx(t.tools.openTool, lang)}
                </a>
                <div className="flex flex-wrap gap-1">
                  {TOOL_TECH[activeIdx].map((tech) => <span key={tech} className="text-xs bg-gray-50 border border-gray-200 text-text-secondary px-2 py-0.5 rounded">{tech}</span>)}
                </div>
              </div>
            </div>
            <div className="md:col-span-3 p-6 lg:p-8 bg-gray-50/50">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {tx(t.tools.liveDemo, lang)}
              </div>
              {effectiveTab === "carbon"  && <CarbonHotspotDemo lang={lang} />}
              {effectiveTab === "scope3"  && <Scope3Demo lang={lang} />}
              {effectiveTab === "csrd"    && <CSRDDemo lang={lang} />}
              {effectiveTab === "planner" && <PlannerDemo lang={lang} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsShowcase;
