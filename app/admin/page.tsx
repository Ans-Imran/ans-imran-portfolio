import { AdminShell } from "@/components/admin/AdminShell";
import { getAnalyticsSummary, type AnalyticsSummary, type Bar } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function BarList({ title, rows }: { title: string; rows: Bar[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      {rows.length === 0 ? <p className="text-sm text-gray-400">No data yet.</p> : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="text-sm">
              <div className="flex justify-between mb-0.5">
                <span className="text-gray-600 truncate pr-2">{r.label}</span>
                <span className="font-semibold text-gray-900 tabular-nums">{r.count}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#15803d] rounded-full" style={{ width: `${(r.count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function fmt(s: number) { return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`; }

const TOOL_NAMES: Record<string, string> = {
  "portfolio": "Portfolio", "lca-planner": "LCA Project Planner", "carbon-hotspot": "Carbon Hotspot Finder",
  "scope3-simulator": "Scope 3 Simulator", "csrd-checker": "CSRD Checker", "csrd-compliance-checker": "CSRD Checker",
};

export default async function AdminDashboard() {
  const a: AnalyticsSummary = await getAnalyticsSummary(30);
  const maxViews = Math.max(1, ...a.daily.map((d) => d.views));

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <span className="text-sm text-gray-500">Last {a.days} days · all tools</span>
      </div>

      {!a.configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Analytics couldn&rsquo;t be reached. Confirm the Supabase env vars in Vercel.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="Unique visitors" value={a.uniqueVisitors.toLocaleString()} />
        <Stat label="Page views" value={a.pageViews.toLocaleString()} />
        <Stat label="Avg. time on page" value={fmt(a.avgDurationSeconds)} />
        <Stat label="Avg. scroll" value={`${a.avgScrollDepth}%`} sub={`${Math.round(a.returningRate * 100)}% returning`} />
      </div>

      {/* per-tool */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Traffic by tool</h3>
        {a.perTool.length === 0 ? <p className="text-sm text-gray-400">No data yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[420px]">
              <thead><tr className="text-left text-xs uppercase text-gray-400">
                <th className="py-1.5 pr-3">Tool</th><th className="py-1.5 pr-3 text-right">Views</th>
                <th className="py-1.5 pr-3 text-right">Visitors</th><th className="py-1.5 text-right">Avg. time</th>
              </tr></thead>
              <tbody>
                {a.perTool.map((t) => (
                  <tr key={t.tool} className="border-t border-gray-100">
                    <td className="py-2 pr-3 font-medium text-gray-900">{TOOL_NAMES[t.tool] ?? t.tool}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{t.views}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{t.visitors}</td>
                    <td className="py-2 text-right tabular-nums text-gray-500">{fmt(t.avgSeconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* daily */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Page views · daily</h3>
        <div className="flex items-end gap-[3px] h-24">
          {a.daily.map((d) => (
            <div key={d.date} className="flex-1 flex items-end" title={`${d.date}: ${d.views}`}>
              <div className="w-full bg-[#15803d]/80 rounded-sm" style={{ height: `${Math.max(2, (d.views / maxViews) * 100)}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <BarList title="Top referrers" rows={a.referrers} />
        <BarList title="Clicks" rows={a.clicks} />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <BarList title="Devices" rows={a.devices} />
        <BarList title="Browsers" rows={a.browsers} />
        <BarList title="Countries" rows={a.countries} />
      </div>
    </AdminShell>
  );
}
