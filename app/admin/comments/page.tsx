import { AdminShell } from "@/components/admin/AdminShell";
import { CommentsModerator } from "@/components/admin/CommentsModerator";
import { getComments } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function CommentsPage() {
  const { configured, rows } = await getComments();
  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Comments</h1>
        <span className="text-sm text-gray-500">{rows.length} total</span>
      </div>
      {!configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Couldn&rsquo;t reach the comments table. Confirm the Supabase env vars in Vercel.
        </div>
      )}
      <CommentsModerator rows={rows} />
    </AdminShell>
  );
}
