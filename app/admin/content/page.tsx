import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentOverrides } from "@/lib/admin-data";
import { t } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const overrides = await getContentOverrides();

  return (
    <AdminShell>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Edit content</h1>
        <p className="text-sm text-gray-500 mt-1">
          Every text field on the site, in English and Swedish. Blank stays as the original.
          List-type fields (skill tags, feature bullets) are still managed in code.
        </p>
      </div>
      <ContentEditor
        defaults={t as unknown as Record<string, unknown>}
        overrides={overrides}
      />
    </AdminShell>
  );
}
