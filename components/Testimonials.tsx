import { getPublicClient } from "@/lib/supabase";

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

async function getTestimonials(): Promise<Comment[]> {
  try {
    const client = getPublicClient();
    const { data, error } = await client
      .from("comments")
      .select("id,full_name,company,designation,rating,comment,tool_slug,created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-yellow-400 text-sm leading-none">
      {"★".repeat(rating)}
      <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export async function Testimonials() {
  const testimonials = await getTestimonials();

  // Hide section entirely if no approved comments
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text-main mb-2 fade-up">
          What practitioners say
        </h2>
        <p className="text-text-secondary text-sm mb-8 fade-up">
          From LCA specialists and sustainability teams who use these tools
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="fade-up bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
            >
              {t.rating && <Stars rating={t.rating} />}
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-text-main">{t.full_name}</div>
                  {(t.company || t.designation) && (
                    <div className="text-xs text-text-secondary">
                      {[t.designation, t.company].filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
                {t.tool_slug && TOOL_NAMES[t.tool_slug] && (
                  <span className="shrink-0 text-xs bg-green-50 text-primary border border-green-100 px-2 py-0.5 rounded-full font-medium">
                    {TOOL_NAMES[t.tool_slug]}
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
