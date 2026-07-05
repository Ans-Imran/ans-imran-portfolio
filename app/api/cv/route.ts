import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public CV link. Redirects to the active version in Storage, else the static file. */
export async function GET(req: NextRequest) {
  try {
    const client = getServiceClient();
    const { data } = await client
      .from("cv_versions")
      .select("path")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (data?.path) {
      const { data: pub } = client.storage.from("cv").getPublicUrl(data.path);
      if (pub?.publicUrl) return NextResponse.redirect(pub.publicUrl);
    }
  } catch {
    // fall through to the bundled static CV
  }
  return NextResponse.redirect(new URL("/cv.pdf", req.url));
}
