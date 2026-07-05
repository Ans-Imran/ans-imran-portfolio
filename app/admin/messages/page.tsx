import { AdminShell } from "@/components/admin/AdminShell";
import { getServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface Lead {
  id?: number | string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

async function loadMessages(): Promise<{ configured: boolean; rows: Lead[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client
      .from("lca_leads")
      .select("id,name,email,message,created_at")
      .eq("source", "portfolio-contact")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as Lead[]) ?? [] };
  } catch {
    return { configured: false, rows: [] };
  }
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export default async function MessagesPage() {
  const { configured, rows } = await loadMessages();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        <span className="text-sm text-gray-500">{rows.length} total</span>
      </div>

      {!configured && (
        <div className="mb-5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Couldn&rsquo;t reach the messages table. Confirm the Supabase env vars are set in Vercel.
        </div>
      )}

      {configured && rows.length === 0 && (
        <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6 text-center">
          No messages yet. Submissions from the contact form will appear here.
        </div>
      )}

      <div className="space-y-3">
        {rows.map((m, i) => (
          <div key={m.id ?? i} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">{m.name}</span>
                <a href={`mailto:${m.email}`} className="text-sm text-[#15803d] hover:underline">
                  {m.email}
                </a>
              </div>
              <span className="text-xs text-gray-400 tabular-nums">{fmtDate(m.created_at)}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-3">
              <a
                href={`mailto:${m.email}?subject=Re: your message&body=Hi ${m.name},%0D%0A%0D%0A`}
                className="text-xs font-medium text-[#15803d] border border-green-200 bg-green-50 rounded-md px-2.5 py-1 hover:bg-green-100 transition-colors"
              >
                Reply
              </a>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
