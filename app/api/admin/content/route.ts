import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Overrides must be an object" }, { status: 400 });
  }

  try {
    const client = getServiceClient();
    const { error } = await client
      .from("site_content")
      .upsert({ id: 1, data: body, updated_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
