import { AdminShell } from "@/components/admin/AdminShell";
import { getPublications } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function str(v: unknown): string { return v == null ? "" : String(v); }

export default async function PublicationsPage() {
  const { configured, rows } = await getPublications();
  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Publications</h1>
        <span className="text-sm text-gray-500">{rows.length} total</span>
      </div>
      {!configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Couldn&rsquo;t reach the publications table. Confirm the Supabase env vars in Vercel.
        </div>
      )}
      {configured && rows.length === 0 && (
        <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6 text-center">
          No publications recorded.
        </div>
      )}
      <div className="space-y-3">
        {rows.map((p, i) => {
          const title = str(p.title ?? p.name);
          const authors = str(p.authors ?? p.author);
          const year = str(p.year);
          const venue = str(p.venue ?? p.journal ?? p.publication);
          const url = str(p.url ?? p.link ?? p.doi);
          return (
            <div key={str(p.id) || i} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-gray-900">{title || "(untitled)"}</h3>
                {year && <span className="text-xs text-gray-400 tabular-nums shrink-0">{year}</span>}
              </div>
              {authors && <p className="text-sm text-gray-600 mt-0.5">{authors}</p>}
              {venue && <p className="text-xs text-gray-400 mt-0.5 italic">{venue}</p>}
              {url && <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#15803d] hover:underline mt-1 inline-block break-all">{url}</a>}
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
