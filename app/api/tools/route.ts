import { NextResponse } from "next/server";
import { getPublicClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = getPublicClient();
    const { data, error } = await client
      .from("tools")
      .select("id,slug,name_en,name_sv,url,icon,color,display_order,active,coming_soon")
      .eq("active", true)
      .order("display_order");
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}
