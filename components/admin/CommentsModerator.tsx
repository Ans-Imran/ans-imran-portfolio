"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Comment } from "@/lib/admin-data";

const STATUS_STYLE: Record<string, string> = {
  approved: "text-[#15803d] bg-green-50 border-green-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  rejected: "text-red-600 bg-red-50 border-red-200",
};

export function CommentsModerator({ rows }: { rows: Comment[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(method: "PATCH" | "DELETE", id: Comment["id"], status?: string) {
    setBusy(String(id));
    try {
      await fetch("/api/admin/comments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status ? { id, status } : { id }),
      });
      router.refresh();
    } finally { setBusy(null); }
  }

  if (rows.length === 0) {
    return <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6 text-center">No comments yet.</div>;
  }

  return (
    <div className="space-y-3">
      {rows.map((c) => {
        const name = c.full_name ?? c.name ?? "Anonymous";
        const text = c.comment ?? c.message ?? "";
        const status = c.status ?? "pending";
        return (
          <div key={String(c.id)} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{name}</span>
                {c.email && <span className="text-sm text-gray-500">{c.email}</span>}
                {c.tool_slug && <span className="text-[10px] uppercase text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5">{c.tool_slug}</span>}
                <span className={`text-[10px] font-semibold uppercase border rounded-full px-2 py-0.5 ${STATUS_STYLE[status] ?? "text-gray-500 bg-gray-50 border-gray-200"}`}>{status}</span>
              </div>
              <span className="text-xs text-gray-400 tabular-nums">{new Date(c.created_at).toLocaleDateString("en-GB")}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap mb-3">{text}</p>
            <div className="flex items-center gap-2">
              {status !== "approved" && <button disabled={busy === String(c.id)} onClick={() => act("PATCH", c.id, "approved")} className="text-xs font-medium text-[#15803d] border border-green-200 bg-green-50 rounded-md px-2.5 py-1 hover:bg-green-100 disabled:opacity-50">Approve</button>}
              {status !== "rejected" && <button disabled={busy === String(c.id)} onClick={() => act("PATCH", c.id, "rejected")} className="text-xs font-medium text-amber-700 border border-amber-200 bg-amber-50 rounded-md px-2.5 py-1 hover:bg-amber-100 disabled:opacity-50">Reject</button>}
              <button disabled={busy === String(c.id)} onClick={() => act("DELETE", c.id)} className="text-xs font-medium text-red-600 border border-red-200 rounded-md px-2.5 py-1 hover:bg-red-50 disabled:opacity-50">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsModerator;
