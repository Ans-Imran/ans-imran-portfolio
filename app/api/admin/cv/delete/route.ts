import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { id?: number };
  try {
    body = (await req.json()) as { id?: number };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const client = getServiceClient();
  const { data: row } = await client
    .from("cv_versions")
    .select("path,is_active")
    .eq("id", body.id)
    .maybeSingle();

  if (row?.is_active) {
    return NextResponse.json(
      { error: "Can't delete the active CV. Activate another version first." },
      { status: 400 },
    );
  }

  const { error } = await client.from("cv_versions").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (row?.path) await client.storage.from("cv").remove([row.path]);

  return NextResponse.json({ ok: true });
}
