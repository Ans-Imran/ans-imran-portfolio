import { AdminShell } from "@/components/admin/AdminShell";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/admin-data";

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

function BarList({ title, rows }: { title: string; rows: Array<{ label: string; count: number }> }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">No data yet.</p>
      ) : (
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

function DailyChart({ daily }: { daily: AnalyticsSummary["daily"] }) {
  const max = Math.max(1, ...daily.map((d) => d.views));
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Page views · daily</h3>
      <div className="flex items-end gap-[3px] h-28">
        {daily.map((d) => (
          <div key={d.date} className="flex-1 group relative flex items-end">
            <div
              className="w-full bg-[#15803d]/80 rounded-sm hover:bg-[#15803d] transition-colors"
              style={{ height: `${Math.max(2, (d.views / max) * 100)}%` }}
              title={`${d.date}: ${d.views}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
        <span>{daily[0]?.date}</span>
        <span>{daily[daily.length - 1]?.date}</span>
      </div>
    </div>
  );
}

function fmtDuration(s: number): string {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

export default async function AdminDashboard() {
  const a = await getAnalyticsSummary(30);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-sm text-gray-500">Last {a.days} days</span>
      </div>

      {!a.configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Analytics storage isn&rsquo;t reachable yet. Run <code>supabase/schema.sql</code> and set the
          Supabase env vars in Vercel, then reload.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="Unique visitors" value={a.uniqueVisitors.toLocaleString()} />
        <Stat label="Page views" value={a.pageViews.toLocaleString()} />
        <Stat label="Avg. time on page" value={fmtDuration(a.avgDurationSeconds)} />
        <Stat label="Avg. scroll depth" value={`${a.avgScrollDepth}%`} sub={`${Math.round(a.returningRate * 100)}% returning`} />
      </div>

      <div className="mb-5">
        <DailyChart daily={a.daily} />
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-5">
        <BarList title="Top referrers" rows={a.referrers} />
        <BarList title="Clicks" rows={a.clicks} />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <BarList title="Devices" rows={a.devices} />
        <BarList title="Browsers" rows={a.browsers} />
      </div>
    </AdminShell>
  );
}
