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
  // Clear the current active first (partial unique index allows only one).
  const { error: clearErr } = await client
    .from("cv_versions")
    .update({ is_active: false })
    .eq("is_active", true);
  if (clearErr) return NextResponse.json({ error: clearErr.message }, { status: 500 });

  const { error } = await client
    .from("cv_versions")
    .update({ is_active: true })
    .eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
