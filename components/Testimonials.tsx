"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

interface Comment {
  id: string;
  full_name: string;
  company: string | null;
  designation: string | null;
  rating: number | null;
  comment: string;
  tool_slug: string | null;
  created_at: string;
}

const TOOL_NAMES: Record<string, string> = {
  "carbon-hotspot":   "Carbon Hotspot Finder",
  "scope3-simulator": "Scope 3 Simulator",
  "csrd-checker":     "CSRD Compliance Checker",
  "lca-planner":      "LCA Project Planner",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-yellow-400 text-sm leading-none">
      {"★".repeat(rating)}
      <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export function Testimonials() {
  const { lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://lca-project-planner.vercel.app/api/comments/approved?pageSize=6")
      .then((r) => r.ok ? r.json() as Promise<{ comments: Comment[] }> : Promise.reject())
      .then((data) => { setTestimonials(data.comments ?? []); })
      .catch(() => { /* silently hide section on error */ })
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text-main mb-2 fade-up">
          {tx(t.testimonials.heading, lang)}
        </h2>
        <p className="text-text-secondary text-sm mb-8 fade-up">
          {tx(t.testimonials.subtitle, lang)}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="fade-up bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
            >
              {item.rating && <Stars rating={item.rating} />}
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                &ldquo;{item.comment}&rdquo;
              </p>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-text-main">{item.full_name}</div>
                  {(item.company || item.designation) && (
                    <div className="text-xs text-text-secondary">
                      {[item.designation, item.company].filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
                {item.tool_slug && TOOL_NAMES[item.tool_slug] && (
                  <span className="shrink-0 text-xs bg-green-50 text-primary border border-green-100 px-2 py-0.5 rounded-full font-medium">
                    {TOOL_NAMES[item.tool_slug]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
