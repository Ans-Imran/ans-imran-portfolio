import { AdminShell } from "@/components/admin/AdminShell";
import { ToolsVisibilityEditor } from "@/components/admin/ToolsVisibilityEditor";
import { getContentOverrides } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const overrides = await getContentOverrides();
  const visibility = (overrides.toolsVisibility as Record<string, boolean>) ?? {};

  return (
    <AdminShell>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Tool cards</h1>
        <p className="text-sm text-gray-500 mt-1">
          Show or hide each tool card in the portfolio&rsquo;s Tools section. Hidden tools disappear
          from the tabs and the &ldquo;Explore the other tools&rdquo; strips.
        </p>
      </div>
      <ToolsVisibilityEditor visibility={visibility} />
    </AdminShell>
  );
}
