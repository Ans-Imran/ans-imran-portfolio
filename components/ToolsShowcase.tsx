"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types ───────────────────────────────────────────────────────────────────── */
type TabKey = "carbon" | "scope3" | "csrd" | "planner";

/* ══════════════════════════════════════════════════════════════════════════════
   TOOL 1 — Carbon Hotspot Finder demo
   ══════════════════════════════════════════════════════════════════════════════ */

const HOTSPOT_PRODUCTS = [
  "Laptop",
  "T-shirt",
  "Beef burger",
  "Electric car",
  "Solar panel",
  "Concrete block",
  "Glass bottle",
  "Aluminium can",
  "Cotton jeans",
  "Smartphone",
] as const;

type HotspotProduct = typeof HOTSPOT_PRODUCTS[number];

const HOTSPOT_DATA: Record<HotspotProduct, { stage: string; pct: number; color: string }[]> = {
  "Laptop":          [{ stage: "Raw materials",  pct: 45, color: "#15803d" }, { stage: "Manufacturing", pct: 20, color: "#16a34a" }, { stage: "Transport",    pct: 5,  color: "#22c55e" }, { stage: "Use phase",    pct: 25, color: "#4ade80" }, { stage: "End of life",  pct: 5,  color: "#86efac" }],
  "T-shirt":         [{ stage: "Raw materials",  pct: 60, color: "#15803d" }, { stage: "Manufacturing", pct: 15, color: "#16a34a" }, { stage: "Transport",    pct: 8,  color: "#22c55e" }, { stage: "Use phase",    pct: 10, color: "#4ade80" }, { stage: "End of life",  pct: 7,  color: "#86efac" }],
  "Beef burger":     [{ stage: "Farming",        pct: 85, color: "#15803d" }, { stage: "Processing",   pct: 5,  color: "#16a34a" }, { stage: "Transport",    pct: 5,  color: "#22c55e" }, { stage: "Retail",       pct: 3,  color: "#4ade80" }, { stage: "End of life",  pct: 2,  color: "#86efac" }],
  "Electric car":    [{ stage: "Raw materials",  pct: 35, color: "#15803d" }, { stage: "Manufacturing", pct: 30, color: "#16a34a" }, { stage: "Transport",    pct: 3,  color: "#22c55e" }, { stage: "Use phase",    pct: 25, color: "#4ade80" }, { stage: "End of life",  pct: 7,  color: "#86efac" }],
  "Solar panel":     [{ stage: "Raw materials",  pct: 50, color: "#15803d" }, { stage: "Manufacturing", pct: 38, color: "#16a34a" }, { stage: "Transport",    pct: 4,  color: "#22c55e" }, { stage: "Use phase",    pct: 3,  color: "#4ade80" }, { stage: "End of life",  pct: 5,  color: "#86efac" }],
  "Concrete block":  [{ stage: "Raw materials",  pct: 70, color: "#15803d" }, { stage: "Manufacturing", pct: 22, color: "#16a34a" }, { stage: "Transport",    pct: 5,  color: "#22c55e" }, { stage: "Use phase",    pct: 2,  color: "#4ade80" }, { stage: "End of life",  pct: 1,  color: "#86efac" }],
  "Glass bottle":    [{ stage: "Raw materials",  pct: 40, color: "#15803d" }, { stage: "Manufacturing", pct: 45, color: "#16a34a" }, { stage: "Transport",    pct: 8,  color: "#22c55e" }, { stage: "Use phase",    pct: 5,  color: "#4ade80" }, { stage: "End of life",  pct: 2,  color: "#86efac" }],
  "Aluminium can":   [{ stage: "Raw materials",  pct: 75, color: "#15803d" }, { stage: "Manufacturing", pct: 18, color: "#16a34a" }, { stage: "Transport",    pct: 4,  color: "#22c55e" }, { stage: "Use phase",    pct: 1,  color: "#4ade80" }, { stage: "End of life",  pct: 2,  color: "#86efac" }],
  "Cotton jeans":    [{ stage: "Raw materials",  pct: 55, color: "#15803d" }, { stage: "Manufacturing", pct: 18, color: "#16a34a" }, { stage: "Transport",    pct: 7,  color: "#22c55e" }, { stage: "Use phase",    pct: 15, color: "#4ade80" }, { stage: "End of life",  pct: 5,  color: "#86efac" }],
  "Smartphone":      [{ stage: "Raw materials",  pct: 50, color: "#15803d" }, { stage: "Manufacturing", pct: 25, color: "#16a34a" }, { stage: "Transport",    pct: 4,  color: "#22c55e" }, { stage: "Use phase",    pct: 18, color: "#4ade80" }, { stage: "End of life",  pct: 3,  color: "#86efac" }],
};

function CarbonHotspotDemo({ active }: { active: boolean }) {
  const [product, setProduct] = useState<HotspotProduct>("Laptop");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!active) return;
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [active, product]);

  const data = HOTSPOT_DATA[product];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
          Select a product
        </label>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value as HotspotProduct)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100"
        >
          {HOTSPOT_PRODUCTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        {data.map((row) => (
          <div key={row.stage}>
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{row.stage}</span>
              <span className="font-semibold text-text-main">{row.pct}%</span>
            </div>
            <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bar-fill h-full rounded-full flex items-center justify-end pr-1"
                style={{
                  width: animated ? `${row.pct}%` : "0%",
                  backgroundColor: row.color,
                  transitionDelay: `${data.indexOf(row) * 80}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-secondary italic">
        Hotspot: <strong className="text-text-main">{data[0].stage}</strong> ({data[0].pct}% of lifecycle emissions)
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TOOL 2 — Scope 3 Simulator demo
   ══════════════════════════════════════════════════════════════════════════════ */

function calcScope3(employees: number, revenue: number) {
  // Simple heuristic model — no API
  const cat1 = Math.round(((revenue * 0.55) + (employees * 0.05)) * 10) / 10;
  const cat7 = Math.round((employees * 0.12) * 10) / 10;
  const cat11 = Math.round(((revenue * 0.18) + (employees * 0.02)) * 10) / 10;
  const other = Math.round(((revenue * 0.27) + (employees * 0.08)) * 10) / 10;
  const total = cat1 + cat7 + cat11 + other;
  return [
    { label: "Cat 1 · Purchased goods", pct: Math.round((cat1 / total) * 100), color: "#15803d" },
    { label: "Cat 7 · Commuting",        pct: Math.round((cat7 / total) * 100), color: "#16a34a" },
    { label: "Cat 11 · Use of products", pct: Math.round((cat11 / total) * 100), color: "#22c55e" },
    { label: "Other categories",          pct: Math.round((other / total) * 100), color: "#bbf7d0" },
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
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;
    paths.push({
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
      color: seg.color,
      label: seg.label,
      pct: seg.pct,
    });
    cumAngle += sweep + gap;
  });

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill={p.color} />
        ))}
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

function Scope3Demo() {
  const [employees, setEmployees] = useState(50);
  const [revenue, setRevenue] = useState(25);

  const segments = calcScope3(employees, revenue);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <label className="font-semibold uppercase tracking-wide">Employees (FTE)</label>
          <span className="font-bold text-text-main">{employees}</span>
        </div>
        <input
          type="range" min={10} max={500} step={10} value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          className="w-full"
          aria-label="Number of employees"
        />
        <div className="flex justify-between text-xs text-gray-300 mt-0.5">
          <span>10</span><span>500</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <label className="font-semibold uppercase tracking-wide">Revenue (MSEK)</label>
          <span className="font-bold text-text-main">{revenue}</span>
        </div>
        <input
          type="range" min={5} max={500} step={5} value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="w-full"
          aria-label="Revenue in MSEK"
        />
        <div className="flex justify-between text-xs text-gray-300 mt-0.5">
          <span>5 MSEK</span><span>500 MSEK</span>
        </div>
      </div>
      <DonutChart segments={segments} />
      <p className="text-xs text-text-secondary italic">
        Material categories flagged for CSRD reporting. Estimates based on industry averages.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TOOL 3 — CSRD Compliance Checker demo
   ══════════════════════════════════════════════════════════════════════════════ */

function checkCSRD(employees: number, listed: boolean) {
  if (listed && employees >= 1) return { year: 2024, wave: "Wave 1", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS E2", "ESRS S1", "ESRS G1"] };
  if (employees >= 500) return { year: 2025, wave: "Wave 2", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS S1", "ESRS G1"] };
  if (employees >= 250) return { year: 2026, wave: "Wave 3", standards: ["ESRS 1", "ESRS 2", "ESRS E1", "ESRS G1"] };
  if (employees >= 50) return { year: 2027, wave: "Wave 4 (SME)", standards: ["ESRS for SMEs (voluntary)"] };
  return null;
}

function CSRDDemo() {
  const [employees, setEmployees] = useState<string>("300");
  const [listed, setListed] = useState(false);

  const emp = parseInt(employees) || 0;
  const result = checkCSRD(emp, listed);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
            Employees
          </label>
          <input
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100"
            placeholder="e.g. 300"
            min={1}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
            Listed (EU)
          </label>
          <button
            type="button"
            onClick={() => setListed((v) => !v)}
            className={[
              "w-full py-2 px-3 rounded-lg text-sm font-medium border transition-colors",
              listed
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-secondary border-gray-200 hover:border-primary",
            ].join(" ")}
          >
            {listed ? "Yes — listed" : "No — private"}
          </button>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">
          Country
        </label>
        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary">
          <option value="SE">🇸🇪 Sweden</option>
          <option value="NO">🇳🇴 Norway</option>
          <option value="DE">🇩🇪 Germany</option>
          <option value="FR">🇫🇷 France</option>
        </select>
      </div>

      {/* Live verdict */}
      <div className={[
        "rounded-lg p-3 border",
        result ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200",
      ].join(" ")}>
        {result ? (
          <>
            <div className="font-semibold text-sm text-green-800 mb-1">
              ✓ CSRD applies from {result.year} ({result.wave})
            </div>
            <div className="text-xs text-green-700 mb-2">Required ESRS standards:</div>
            <div className="flex flex-wrap gap-1">
              {result.standards.map((s) => (
                <span key={s} className="text-xs bg-white border border-green-200 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="text-sm font-medium text-amber-800">
            CSRD does not apply yet (below thresholds)
          </div>
        )}
      </div>
      <p className="text-xs text-text-secondary italic">
        Based on CSRD Directive thresholds. Full assessment requires revenue and asset data.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TOOL 4 — LCA Project Planner demo
   ══════════════════════════════════════════════════════════════════════════════ */

const LCA_PRODUCTS = ["Physical product", "Energy system", "Service", "Building/infrastructure", "Food system"];

const TIMELINE_MAP: Record<string, Record<string, { weeks: string; cost: string; std: string }>> = {
  "Physical product": {
    "Cradle-to-gate": { weeks: "4-6",   cost: "40,000–80,000",  std: "ISO 14040/44" },
    "Cradle-to-grave": { weeks: "6-10",  cost: "70,000–120,000", std: "ISO 14040/44 + ISO 14067" },
    "Cradle-to-cradle": { weeks: "8-14", cost: "90,000–150,000", std: "ISO 14040/44 + circular LCA" },
  },
  "Energy system": {
    "Cradle-to-gate": { weeks: "3-5",   cost: "35,000–65,000",  std: "ISO 14040/44" },
    "Cradle-to-grave": { weeks: "5-9",  cost: "60,000–110,000", std: "ISO 14040/44" },
    "Cradle-to-cradle": { weeks: "7-12", cost: "80,000–130,000", std: "ISO 14040/44 + EPBT" },
  },
  "Service": {
    "Cradle-to-gate": { weeks: "3-5",   cost: "30,000–60,000",  std: "ISO 14040/44" },
    "Cradle-to-grave": { weeks: "4-8",  cost: "50,000–90,000",  std: "ISO 14040/44" },
    "Cradle-to-cradle": { weeks: "6-10", cost: "70,000–110,000", std: "ISO 14040/44" },
  },
  "Building/infrastructure": {
    "Cradle-to-gate": { weeks: "6-10",  cost: "60,000–100,000", std: "ISO 14040/44 + EN 15978" },
    "Cradle-to-grave": { weeks: "10-16", cost: "100,000–180,000", std: "ISO 14040/44 + EN 15978" },
    "Cradle-to-cradle": { weeks: "14-20", cost: "140,000–220,000", std: "ISO 14040/44 + EN 15978" },
  },
  "Food system": {
    "Cradle-to-gate": { weeks: "4-7",   cost: "40,000–75,000",  std: "ISO 14040/44 + PCF" },
    "Cradle-to-grave": { weeks: "6-11", cost: "65,000–115,000", std: "ISO 14040/44 + ISO 14067" },
    "Cradle-to-cradle": { weeks: "9-14", cost: "85,000–145,000", std: "ISO 14040/44 + ISO 14067" },
  },
};

function PlannerDemo() {
  const [step, setStep] = useState(0);
  const [productType, setProductType] = useState("");
  const [scope, setScope] = useState("");
  const [dataAvail, setDataAvail] = useState("");
  const [showResult, setShowResult] = useState(false);

  const reset = () => { setStep(0); setProductType(""); setScope(""); setDataAvail(""); setShowResult(false); };

  const result = productType && scope && TIMELINE_MAP[productType]?.[scope]
    ? TIMELINE_MAP[productType][scope]
    : { weeks: "4-8", cost: "50,000–100,000", std: "ISO 14040/44" };

  const dataAdj = dataAvail === "Complete" ? -1 : dataAvail === "Partial" ? 0 : 2;
  const weekParts = result.weeks.split("-").map(Number);
  const adjWeeks = `${weekParts[0] + dataAdj}–${weekParts[1] + dataAdj}`;

  return (
    <div className="space-y-4 min-h-[220px]">
      {!showResult ? (
        <div className="tool-panel">
          <div className="flex items-center gap-1.5 mb-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={["w-6 h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-gray-200"].join(" ")} />
            ))}
            <span className="text-xs text-text-secondary ml-1">Step {step + 1} of 3</span>
          </div>

          {step === 0 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">What type of product or system?</div>
              <div className="space-y-1.5">
                {LCA_PRODUCTS.map((p) => (
                  <button key={p} type="button"
                    className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", productType === p ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")}
                    onClick={() => { setProductType(p); setStep(1); }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">What system boundary?</div>
              <div className="space-y-1.5">
                {["Cradle-to-gate", "Cradle-to-grave", "Cradle-to-cradle"].map((s) => (
                  <button key={s} type="button"
                    className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", scope === s ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")}
                    onClick={() => { setScope(s); setStep(2); }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="tool-panel">
              <div className="text-sm font-semibold text-text-main mb-3">How complete is your data?</div>
              <div className="space-y-1.5">
                {["Complete", "Partial", "Minimal"].map((d) => (
                  <button key={d} type="button"
                    className={["w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors", dataAvail === d ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-text-main"].join(" ")}
                    onClick={() => { setDataAvail(d); setShowResult(true); }}>
                    {d} — {d === "Complete" ? "all process data ready" : d === "Partial" ? "some data gaps" : "need full data collection"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="tool-panel">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
            <div className="text-sm font-bold text-primary">Your LCA Estimate</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-xs text-text-secondary mb-0.5">Timeline</div>
                <div className="text-base font-bold text-text-main">{adjWeeks} weeks</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-xs text-text-secondary mb-0.5">Est. cost (SEK)</div>
                <div className="text-base font-bold text-text-main">{result.cost}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-100">
              <div className="text-xs text-text-secondary mb-0.5">Recommended standard</div>
              <div className="text-sm font-semibold text-text-main">{result.std}</div>
            </div>
            <div className="text-xs text-text-secondary">
              {productType} · {scope} · {dataAvail} data
            </div>
          </div>
          <button type="button" onClick={reset}
            className="mt-3 text-xs text-primary hover:underline">
            ← Try again
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TOOLS DATA
   ══════════════════════════════════════════════════════════════════════════════ */

const TOOLS = [
  {
    key: "carbon" as TabKey,
    icon: "🔍",
    name: "Carbon Hotspot Finder",
    problem: "Finding the carbon hotspot in a product's lifecycle takes hours of manual LCA work.",
    solution: "Enter a product. See where 80% of the emissions come from in seconds.",
    features: [
      "10 product categories from ecoinvent 3.9.1",
      "5-stage lifecycle breakdown",
      "IPCC AR6 GWP100 characterisation",
      "ESRS E1-6 ready summary export",
    ],
    link: "https://carbon-hotspot-finder.vercel.app",
    tech: ["Next.js", "TypeScript", "ecoinvent", "ISO 14067"],
  },
  {
    key: "scope3" as TabKey,
    icon: "📊",
    name: "Scope 3 Simulator",
    problem: "Swedish SMEs entering CSRD scope have no idea which of their 15 Scope 3 categories are material.",
    solution: "Input company size and sector. Get a materiality-ranked Scope 3 profile in under a minute.",
    features: [
      "All 15 GHG Protocol Scope 3 categories",
      "6 Swedish SME sector profiles",
      "ESRS E1 disclosure mapping",
      "Swedish-language interface",
    ],
    link: "https://scope3-simulator.vercel.app",
    tech: ["Next.js", "TypeScript", "GHG Protocol", "CSRD/ESRS"],
  },
  {
    key: "csrd" as TabKey,
    icon: "✅",
    name: "CSRD Compliance Checker",
    problem: "Companies don't know if or when CSRD applies to them, or which ESRS standards they need to follow.",
    solution: "Three inputs. Instant CSRD applicability verdict with required standards list.",
    features: [
      "Covers all 4 CSRD waves (2024-2028)",
      "Double materiality assessment guide",
      "Required ESRS standards per wave",
      "SME-specific guidance included",
    ],
    link: "https://csrd-compliance-checker.vercel.app",
    tech: ["Next.js", "TypeScript", "CSRD Directive", "ESRS"],
  },
  {
    key: "planner" as TabKey,
    icon: "📋",
    name: "LCA Project Planner",
    problem: "Companies that need an LCA don't know how long it takes, what it costs, or what data they need.",
    solution: "Answer 3 quick questions. Get a scope, timeline, and budget estimate instantly.",
    features: [
      "5 product/system categories",
      "Timeline and cost ranges in SEK",
      "Recommended ISO standards",
      "Data collection checklist",
    ],
    link: "https://lca-project-planner.vercel.app",
    tech: ["Next.js", "TypeScript", "ISO 14040/44", "PostgreSQL"],
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */

export function ToolsShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("carbon");

  const activeTool = TOOLS.find((t) => t.key === activeTab)!;

  const handleTabChange = useCallback((key: TabKey) => {
    setActiveTab(key);
  }, []);

  return (
    <section id="tools" className="py-20 bg-primary-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 fade-up">
          <h2 className="text-2xl font-bold text-text-main mb-2">Problems I Solved</h2>
          <p className="text-text-secondary">
            Four free tools built for LCA practitioners and sustainability teams
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1 mb-6 fade-up">
          {TOOLS.map((tool) => (
            <button
              key={tool.key}
              type="button"
              onClick={() => handleTabChange(tool.key)}
              className={[
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0",
                activeTab === tool.key
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-text-secondary hover:text-text-main hover:bg-white/80 border border-gray-100",
              ].join(" ")}
            >
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden fade-up">
          <div key={activeTab} className="tool-panel grid md:grid-cols-5 gap-0 min-h-[400px]">
            {/* Left — info (40%) */}
            <div className="md:col-span-2 p-6 lg:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{activeTool.icon}</span>
                <span className="text-base font-bold text-text-main">{activeTool.name}</span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">The problem</div>
                <p className="text-sm font-semibold text-text-main leading-snug">&ldquo;{activeTool.problem}&rdquo;</p>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">The solution</div>
                <p className="text-sm text-text-secondary">{activeTool.solution}</p>
              </div>

              <ul className="space-y-1 mb-6 flex-1">
                {activeTool.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a
                  href={activeTool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-scale flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Open full tool →
                </a>
                <div className="flex flex-wrap gap-1">
                  {activeTool.tech.map((t) => (
                    <span key={t} className="text-xs bg-gray-50 border border-gray-200 text-text-secondary px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — live demo (60%) */}
            <div className="md:col-span-3 p-6 lg:p-8 bg-gray-50/50">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live demo — try it now
              </div>
              {activeTab === "carbon"  && <CarbonHotspotDemo active={true} />}
              {activeTab === "scope3"  && <Scope3Demo />}
              {activeTab === "csrd"    && <CSRDDemo />}
              {activeTab === "planner" && <PlannerDemo />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsShowcase;
