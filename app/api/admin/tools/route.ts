import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

/** Save which tool cards are visible on the portfolio. Stored in site_content.data.toolsVisibility. */
export async function POST(req: NextRequest) {
  let body: { toolsVisibility?: Record<string, boolean> };
  try {
    body = (await req.json()) as { toolsVisibility?: Record<string, boolean> };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const vis = body.toolsVisibility;
  if (!vis || typeof vis !== "object" || Array.isArray(vis)) {
    return NextResponse.json({ error: "toolsVisibility object required" }, { status: 400 });
  }

  try {
    const client = getServiceClient();
    const { data: row } = await client.from("site_content").select("data").eq("id", 1).maybeSingle();
    const existing = (row?.data ?? {}) as Record<string, unknown>;
    const merged = { ...existing, toolsVisibility: vis };
    const { error } = await client
      .from("site_content")
      .upsert({ id: 1, data: merged, updated_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
