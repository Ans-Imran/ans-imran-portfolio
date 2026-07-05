import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

interface TrackPayload {
  session_id?: string;
  event_type?: string; // page_view | page_leave | click
  tool_slug?: string;
  target?: string;
  path?: string;
  device_type?: string;
  os?: string;
  browser?: string;
  referrer?: string;
  returned_visitor?: boolean;
  duration_seconds?: number;
  scroll_depth?: number;
}

const ALLOWED = new Set(["page_view", "page_leave", "click"]);

export async function POST(req: NextRequest) {
  let body: TrackPayload;
  try {
    body = (await req.json()) as TrackPayload;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  if (!body.event_type || !ALLOWED.has(body.event_type)) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const client = getServiceClient();
    await client.from("portfolio_events").insert({
      session_id:       body.session_id ?? null,
      event_type:       body.event_type,
      tool_slug:        body.tool_slug ?? null,
      target:           body.target ?? null,
      path:             body.path ?? null,
      device_type:      body.device_type ?? null,
      os:               body.os ?? null,
      browser:          body.browser ?? null,
      referrer:         body.referrer ?? null,
      returned_visitor: body.returned_visitor ?? null,
      duration_seconds: Number.isFinite(body.duration_seconds) ? body.duration_seconds : null,
      scroll_depth:     Number.isFinite(body.scroll_depth) ? body.scroll_depth : null,
    });
  } catch {
    // analytics must never break the page
  }

  return new NextResponse(null, { status: 204 });
}
