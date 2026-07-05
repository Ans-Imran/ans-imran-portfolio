"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ToolRow } from "@/lib/admin-data";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${on ? "bg-[#15803d]" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

export function ToolsRegistryEditor({ rows }: { rows: ToolRow[] }) {
  const router = useRouter();
  const [tools, setTools] = useState<ToolRow[]>(rows);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function edit(id: ToolRow["id"], patch: Partial<ToolRow>) {
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    setMsg(null);
  }

  async function save(t: ToolRow) {
    setBusy(String(t.id));
    setMsg(null);
    try {
      const res = await fetch("/api/admin/tools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          fields: {
            name_en: t.name_en, name_sv: t.name_sv, url: t.url, icon: t.icon,
            display_order: Number(t.display_order), active: t.active, coming_soon: t.coming_soon,
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setMsg(data.error ?? "Save failed");
      else { setMsg(`Saved ${t.name_en}`); router.refresh(); }
    } catch { setMsg("Network error"); }
    finally { setBusy(null); }
  }

  if (tools.length === 0) {
    return <p className="text-sm text-gray-500">The tools registry is empty.</p>;
  }

  return (
    <div>
      <div className="space-y-3">
        {tools.sort((a, b) => a.display_order - b.display_order).map((t) => (
          <div key={String(t.id)} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <input value={t.icon} onChange={(e) => edit(t.id, { icon: e.target.value })}
                className="w-10 text-center border border-gray-200 rounded-lg py-1.5 text-lg" aria-label="icon" />
              <input value={t.name_en} onChange={(e) => edit(t.id, { name_en: e.target.value })}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-[#15803d]" aria-label="name" />
              <span className="text-xs text-gray-400 font-mono shrink-0">{t.slug}</span>
            </div>
            <input value={t.url} onChange={(e) => edit(t.id, { url: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 mb-3 focus:outline-none focus:border-[#15803d]" aria-label="url" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Toggle on={t.active} onClick={() => edit(t.id, { active: !t.active })} /> Active
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Toggle on={t.coming_soon} onClick={() => edit(t.id, { coming_soon: !t.coming_soon })} /> Coming soon
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                Order
                <input type="number" value={t.display_order} onChange={(e) => edit(t.id, { display_order: Number(e.target.value) })}
                  className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm" />
              </label>
              <button type="button" onClick={() => save(t)} disabled={busy === String(t.id)}
                className="ml-auto bg-[#15803d] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#0f5c2e] disabled:opacity-50">
                {busy === String(t.id) ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {msg && <p className="text-sm text-[#15803d] mt-3">{msg}</p>}
    </div>
  );
}

export default ToolsRegistryEditor;
