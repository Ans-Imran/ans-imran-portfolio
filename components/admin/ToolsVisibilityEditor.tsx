"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOOLS = [
  { slug: "carbon",  label: "Carbon Hotspot Finder",   icon: "🔍" },
  { slug: "scope3",  label: "Scope 3 Simulator",       icon: "📊" },
  { slug: "csrd",    label: "CSRD Compliance Checker",  icon: "✅" },
  { slug: "planner", label: "LCA Project Planner",      icon: "📋" },
];

export function ToolsVisibilityEditor({ visibility }: { visibility: Record<string, boolean> }) {
  const router = useRouter();
  const [vis, setVis] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const tool of TOOLS) init[tool.slug] = visibility[tool.slug] !== false;
    return init;
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const visibleCount = TOOLS.filter((t) => vis[t.slug]).length;

  function toggle(slug: string) {
    setVis((p) => ({ ...p, [slug]: !p[slug] }));
    setMsg(null);
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolsVisibility: vis }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setMsg({ kind: "err", text: data.error ?? "Save failed" });
      else { setMsg({ kind: "ok", text: "Saved. Reload the public site to see the change." }); router.refresh(); }
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {TOOLS.map((tool) => {
          const on = vis[tool.slug];
          return (
            <div key={tool.slug} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{tool.icon}</span>
                <span className="font-medium text-gray-900">{tool.label}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => toggle(tool.slug)}
                className={[
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  on ? "bg-[#15803d]" : "bg-gray-300",
                ].join(" ")}
              >
                <span className={["inline-block h-5 w-5 transform rounded-full bg-white transition-transform", on ? "translate-x-5" : "translate-x-0.5"].join(" ")} />
              </button>
            </div>
          );
        })}
      </div>

      {visibleCount === 0 && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
          All tools are hidden — the Tools section will not appear on the site.
        </p>
      )}

      <div className="flex items-center gap-4 mt-4">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="bg-[#15803d] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#0f5c2e] transition-colors disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save"}
        </button>
        {msg && <span className={`text-sm ${msg.kind === "ok" ? "text-[#15803d]" : "text-red-600"}`}>{msg.text}</span>}
      </div>
    </div>
  );
}

export default ToolsVisibilityEditor;
