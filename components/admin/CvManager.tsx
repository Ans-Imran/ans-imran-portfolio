"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { CvVersion } from "@/lib/admin-data";

export function CvManager({ versions }: { versions: CvVersion[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("Choose a PDF first."); return; }
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("label", label);
    try {
      const res = await fetch("/api/admin/cv/upload", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) { setError(data.error ?? "Upload failed"); return; }
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  async function act(url: string, id: number) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setError(data.error ?? "Action failed");
      else router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={upload} className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Upload a new CV (PDF)</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#15803d] file:text-white file:px-3 file:py-1.5 file:text-sm file:font-medium"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Version label (e.g. 2026-07 · English)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#15803d]"
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0f5c2e] transition-colors disabled:opacity-50"
          >
            {busy ? "Working…" : "Upload"}
          </button>
        </div>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </form>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {versions.length === 0 ? (
          <p className="text-sm text-gray-500 p-6 text-center">
            No CV versions yet. Upload one above — the first becomes the live CV automatically.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {versions.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">{v.label}</span>
                    {v.is_active && (
                      <span className="text-xs font-semibold text-[#15803d] bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {v.filename} · {new Date(v.created_at).toLocaleDateString("en-GB")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!v.is_active && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => act("/api/admin/cv/activate", v.id)}
                      className="text-sm font-medium border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-100 disabled:opacity-50"
                    >
                      Set live
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busy || v.is_active}
                    onClick={() => act("/api/admin/cv/delete", v.id)}
                    className="text-sm font-medium text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-gray-400">
        The public “Download CV” button always serves the version marked <b>Live</b>.
      </p>
    </div>
  );
}

export default CvManager;
