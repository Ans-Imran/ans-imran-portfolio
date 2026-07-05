import { AdminShell } from "@/components/admin/AdminShell";
import { CvManager } from "@/components/admin/CvManager";
import { getCvVersions } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function CvPage() {
  const { configured, rows } = await getCvVersions();

  return (
    <AdminShell>
      <h1 className="text-xl font-bold text-gray-900 mb-5">CV versions</h1>
      {!configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          CV storage isn&rsquo;t reachable. Run <code>supabase/schema.sql</code> (it creates the
          <code> cv_versions</code> table and the <code>cv</code> storage bucket) and set the Supabase env vars.
        </div>
      )}
      <CvManager versions={rows} />
    </AdminShell>
  );
}
