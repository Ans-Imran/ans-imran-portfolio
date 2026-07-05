import { AdminShell } from "@/components/admin/AdminShell";
import { getLeads } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

const TOOL_NAMES: Record<string, string> = {
  "portfolio-contact": "Portfolio", "portfolio": "Portfolio", "lca-planner": "LCA Planner",
  "carbon-hotspot": "Carbon", "scope3-simulator": "Scope 3", "csrd-checker": "CSRD",
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export default async function MessagesPage() {
  const { configured, rows } = await getLeads();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        <span className="text-sm text-gray-500">{rows.length} total · all tools</span>
      </div>

      {!configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Couldn&rsquo;t reach the leads table. Confirm the Supabase env vars in Vercel.
        </div>
      )}
      {configured && rows.length === 0 && (
        <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6 text-center">
          No messages yet. Submissions from any tool&rsquo;s contact form appear here.
        </div>
      )}

      <div className="space-y-3">
        {rows.map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{m.name}</span>
                <a href={`mailto:${m.email}`} className="text-sm text-[#15803d] hover:underline">{m.email}</a>
                {m.company && <span className="text-xs text-gray-400">· {m.company}</span>}
                {m.tool_slug && (
                  <span className="text-[10px] font-semibold uppercase text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5">
                    {TOOL_NAMES[m.tool_slug] ?? m.tool_slug}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 tabular-nums">{fmtDate(m.created_at)}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-3">
              <a href={`mailto:${m.email}?subject=Re: your message&body=Hi ${m.name},%0D%0A%0D%0A`}
                className="text-xs font-medium text-[#15803d] border border-green-200 bg-green-50 rounded-md px-2.5 py-1 hover:bg-green-100 transition-colors">
                Reply
              </a>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
