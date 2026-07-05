import { AdminShell } from "@/components/admin/AdminShell";
import { ToolsVisibilityEditor } from "@/components/admin/ToolsVisibilityEditor";
import { ToolsRegistryEditor } from "@/components/admin/ToolsRegistryEditor";
import { getContentOverrides, getToolsRegistry } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const overrides = await getContentOverrides();
  const visibility = (overrides.toolsVisibility as Record<string, boolean>) ?? {};
  const { configured, rows } = await getToolsRegistry();

  return (
    <AdminShell>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Tools</h1>
      <p className="text-sm text-gray-500 mb-6">
        Control the portfolio&rsquo;s tool cards and the shared tools registry.
      </p>

      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Portfolio card visibility</h2>
        <p className="text-sm text-gray-500 mb-4">Show or hide each card in the portfolio&rsquo;s Tools section.</p>
        <ToolsVisibilityEditor visibility={visibility} />
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Tools registry</h2>
        <p className="text-sm text-gray-500 mb-4">
          The shared master list (<code>tools</code> table): name, URL, icon, order, active state and &ldquo;coming soon&rdquo; flag.
        </p>
        {!configured && (
          <div className="mb-4 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            Couldn&rsquo;t reach the tools table. Confirm the Supabase env vars in Vercel.
          </div>
        )}
        <ToolsRegistryEditor rows={rows} />
      </section>
    </AdminShell>
  );
}
