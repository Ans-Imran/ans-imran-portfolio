"use client";

import { useMemo, useState } from "react";

type Json = Record<string, unknown>;
interface Leaf { key: string; path: string[]; en: string; sv: string }

function isStringLeaf(v: unknown): v is { en: string; sv: string } {
  return (
    !!v && typeof v === "object" && !Array.isArray(v) &&
    typeof (v as Json).en === "string" && typeof (v as Json).sv === "string"
  );
}

function collect(node: unknown, path: string[], out: Leaf[]) {
  if (isStringLeaf(node)) {
    out.push({ key: path.join("."), path, en: node.en, sv: node.sv });
    return;
  }
  if (node && typeof node === "object" && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node as Json)) collect(v, [...path, k], out);
  }
}

function deepGet(obj: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Json)[k] : undefined), obj);
}

function setPath(root: Json, path: string[], value: unknown) {
  let node = root;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (!node[k] || typeof node[k] !== "object") node[k] = {};
    node = node[k] as Json;
  }
  node[path[path.length - 1]] = value;
}

function humanize(key: string): string {
  const map: Record<string, string> = {
    nav: "Navigation", hero: "Hero", about: "About", tools: "Tools",
    featured: "Featured project", publications: "Publications",
    education: "Education", footer: "Footer", contact: "Contact",
    credibility: "Credibility bar", credibilityBar: "Credibility bar",
  };
  if (map[key]) return map[key];
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}

export function ContentEditor({
  defaults,
  overrides,
}: {
  defaults: Json;
  overrides: Json;
}) {
  const leaves = useMemo(() => {
    const out: Leaf[] = [];
    collect(defaults, [], out);
    return out;
  }, [defaults]);

  const [edits, setEdits] = useState<Record<string, { en: string; sv: string }>>(() => {
    const init: Record<string, { en: string; sv: string }> = {};
    for (const leaf of leaves) {
      const ov = deepGet(overrides, leaf.path);
      init[leaf.key] = {
        en: isStringLeaf(ov) ? ov.en : leaf.en,
        sv: isStringLeaf(ov) ? ov.sv : leaf.sv,
      };
    }
    return init;
  });

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const groups = useMemo(() => {
    const g = new Map<string, Leaf[]>();
    for (const leaf of leaves) {
      const top = leaf.path[0];
      if (!g.has(top)) g.set(top, []);
      g.get(top)!.push(leaf);
    }
    return g;
  }, [leaves]);

  const dirtyCount = leaves.filter((l) => {
    const e = edits[l.key];
    return e && (e.en !== l.en || e.sv !== l.sv);
  }).length;

  function update(key: string, lang: "en" | "sv", value: string) {
    setEdits((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: value } }));
    setMsg(null);
  }

  function resetLeaf(leaf: Leaf) {
    setEdits((prev) => ({ ...prev, [leaf.key]: { en: leaf.en, sv: leaf.sv } }));
    setMsg(null);
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const out: Json = {};
    for (const leaf of leaves) {
      const e = edits[leaf.key];
      if (e && (e.en !== leaf.en || e.sv !== leaf.sv)) {
        setPath(out, leaf.path, { en: e.en, sv: e.sv });
      }
    }
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(out),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setMsg({ kind: "err", text: data.error ?? "Save failed" });
      else setMsg({ kind: "ok", text: "Saved. Reload the public site to see changes." });
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pb-24">
      {Array.from(groups.entries()).map(([top, items]) => (
        <section key={top} className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
            {humanize(top)}
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {items.map((leaf) => {
              const e = edits[leaf.key];
              const dirty = e && (e.en !== leaf.en || e.sv !== leaf.sv);
              const sub = leaf.path.slice(1).join(" · ") || leaf.path[0];
              return (
                <div key={leaf.key} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-xs text-gray-500">{sub}</code>
                    {dirty && (
                      <button
                        type="button"
                        onClick={() => resetLeaf(leaf)}
                        className="text-xs text-gray-400 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(["en", "sv"] as const).map((l) => (
                      <label key={l} className="block">
                        <span className="text-[11px] font-semibold uppercase text-gray-400">
                          {l === "en" ? "English" : "Svenska"}
                        </span>
                        <textarea
                          value={e?.[l] ?? ""}
                          onChange={(ev) => update(leaf.key, l, ev.target.value)}
                          rows={Math.min(6, Math.max(1, Math.ceil((e?.[l]?.length ?? 0) / 60)))}
                          className={[
                            "mt-1 w-full border rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-green-100",
                            dirty ? "border-[#15803d]" : "border-gray-200 focus:border-[#15803d]",
                          ].join(" ")}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="text-sm">
            {msg ? (
              <span className={msg.kind === "ok" ? "text-[#15803d]" : "text-red-600"}>{msg.text}</span>
            ) : (
              <span className="text-gray-500">
                {dirtyCount === 0 ? "No unsaved changes" : `${dirtyCount} field${dirtyCount === 1 ? "" : "s"} changed`}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={save}
            disabled={busy || dirtyCount === 0}
            className="bg-[#15803d] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#0f5c2e] transition-colors disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;
