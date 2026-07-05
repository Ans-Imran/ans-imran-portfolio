import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  const label = String(form.get("label") ?? "").trim();
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "CV must be a PDF" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const client = getServiceClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${crypto.randomUUID()}-${safeName}`;

  const { error: upErr } = await client.storage
    .from("cv")
    .upload(path, await file.arrayBuffer(), { contentType: "application/pdf", upsert: false });
  if (upErr) {
    return NextResponse.json({ error: `Storage: ${upErr.message}` }, { status: 500 });
  }

  // First version becomes active automatically.
  const { count } = await client
    .from("cv_versions")
    .select("id", { count: "exact", head: true });
  const makeActive = (count ?? 0) === 0;

  const { error: insErr } = await client.from("cv_versions").insert({
    label: label || file.name,
    path,
    filename: file.name,
    is_active: makeActive,
  });
  if (insErr) {
    await client.storage.from("cv").remove([path]);
    return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
