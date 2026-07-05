import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

// Update a comment's moderation status.
export async function PATCH(req: NextRequest) {
  let body: { id?: number | string; status?: string };
  try { body = (await req.json()) as { id?: number | string; status?: string }; }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!body.id || !body.status) return NextResponse.json({ error: "id and status required" }, { status: 400 });
  try {
    const client = getServiceClient();
    const { error } = await client.from("comments").update({ status: body.status }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}

// Delete a comment.
export async function DELETE(req: NextRequest) {
  let body: { id?: number | string };
  try { body = (await req.json()) as { id?: number | string }; }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  try {
    const client = getServiceClient();
    const { error } = await client.from("comments").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}
