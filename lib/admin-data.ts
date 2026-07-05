import { getServiceClient } from "@/lib/supabase";

/* ============================================================================
   Master admin data layer — reads the SHARED database (job-dashboard project).
   tool_events = cross-tool analytics (all tools). portfolio_events = portfolio.
   ========================================================================== */

type Row = Record<string, unknown>;

// ── Content / settings (CMS + tool visibility) ─────────────────────────────
export async function getContentOverrides(): Promise<Record<string, unknown>> {
  try {
    const client = getServiceClient();
    const { data } = await client.from("site_content").select("data").eq("id", 1).maybeSingle();
    return (data?.data as Record<string, unknown>) ?? {};
  } catch {
    return {};
  }
}

// ── CV versions ─────────────────────────────────────────────────────────────
export interface CvVersion {
  id: number; label: string; path: string; filename: string; is_active: boolean; created_at: string;
}
export async function getCvVersions(): Promise<{ configured: boolean; rows: CvVersion[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client
      .from("cv_versions").select("id,label,path,filename,is_active,created_at")
      .order("created_at", { ascending: false });
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as CvVersion[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Leads / messages (shared lca_leads — tool_slug, NOT source) ─────────────
export interface Lead {
  id: number | string; name: string; email: string; company: string | null;
  message: string; tool_slug: string | null; status: string | null; created_at: string;
}
export async function getLeads(): Promise<{ configured: boolean; rows: Lead[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client
      .from("lca_leads").select("id,name,email,company,message,tool_slug,status,created_at")
      .order("created_at", { ascending: false }).limit(500);
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as Lead[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Comments (moderation) ────────────────────────────────────────────────────
export interface Comment {
  id: number | string; full_name?: string; name?: string; email?: string;
  comment?: string; message?: string; tool_slug?: string; status: string; created_at: string;
}
export async function getComments(): Promise<{ configured: boolean; rows: Comment[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client
      .from("comments").select("*").order("created_at", { ascending: false }).limit(500);
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as Comment[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Tools registry ───────────────────────────────────────────────────────────
export interface ToolRow {
  id: number | string; slug: string; name_en: string; name_sv: string; url: string;
  icon: string; color?: string; display_order: number; active: boolean; coming_soon: boolean;
}
export async function getToolsRegistry(): Promise<{ configured: boolean; rows: ToolRow[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client.from("tools").select("*").order("display_order");
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as ToolRow[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Publications ─────────────────────────────────────────────────────────────
export async function getPublications(): Promise<{ configured: boolean; rows: Row[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client.from("publications").select("*")
      .order("display_order", { ascending: true }).order("year", { ascending: false });
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as Row[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Saved assessments ────────────────────────────────────────────────────────
export async function getAssessments(): Promise<{ configured: boolean; rows: Row[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client.from("saved_assessments").select("*")
      .order("created_at", { ascending: false }).limit(200);
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as Row[]) ?? [] };
  } catch { return { configured: false, rows: [] }; }
}

// ── Analytics (unified: tool_events + portfolio_events) ─────────────────────
export interface Bar { label: string; count: number }
export interface ToolStat { tool: string; views: number; visitors: number; avgSeconds: number }
export interface AnalyticsSummary {
  configured: boolean; days: number;
  pageViews: number; uniqueVisitors: number; returningRate: number;
  avgDurationSeconds: number; avgScrollDepth: number;
  perTool: ToolStat[];
  referrers: Bar[]; devices: Bar[]; browsers: Bar[]; countries: Bar[]; clicks: Bar[];
  daily: { date: string; views: number }[];
}

function tally(rows: Row[], key: string, limit = 100): Bar[] {
  const m = new Map<string, number>();
  for (const r of rows) { const v = (r[key] as string) || "Unknown"; m.set(v, (m.get(v) ?? 0) + 1); }
  return Array.from(m.entries()).map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count).slice(0, limit);
}
const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

function emptyAnalytics(days: number): AnalyticsSummary {
  return { configured: false, days, pageViews: 0, uniqueVisitors: 0, returningRate: 0,
    avgDurationSeconds: 0, avgScrollDepth: 0, perTool: [], referrers: [], devices: [],
    browsers: [], countries: [], clicks: [], daily: [] };
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  let client;
  try { client = getServiceClient(); } catch { return emptyAnalytics(days); }

  const cols = "session_id,event_type,tool_slug,device_type,os,browser,referrer,duration_seconds,scroll_depth,returned_visitor,created_at";
  const [teRes, peRes] = await Promise.all([
    client.from("tool_events").select(`${cols},country`).gte("created_at", since).limit(50_000),
    client.from("portfolio_events").select(`${cols},target,path`).gte("created_at", since).limit(50_000),
  ]);
  if (teRes.error && peRes.error) return emptyAnalytics(days);

  const te = (teRes.data ?? []) as Row[];
  const pe = ((peRes.data ?? []) as Row[]).map((r) => ({ ...r, tool_slug: r.tool_slug ?? "portfolio" }));
  const all: Row[] = [...te, ...pe];

  const views = all.filter((r) => r.event_type === "page_view");
  const leaves = all.filter((r) => r.event_type === "page_leave");
  const clicks = all.filter((r) => r.event_type === "click");

  const uniq = new Set(views.map((r) => r.session_id).filter(Boolean)).size;
  const returning = views.filter((r) => r.returned_visitor === true).length;
  const durations = leaves.map((r) => r.duration_seconds).filter((n): n is number => typeof n === "number");
  const scrolls = leaves.map((r) => r.scroll_depth).filter((n): n is number => typeof n === "number");

  // per-tool
  const toolMap = new Map<string, { views: number; sessions: Set<string>; secs: number[] }>();
  for (const r of views) {
    const t = (r.tool_slug as string) || "unknown";
    if (!toolMap.has(t)) toolMap.set(t, { views: 0, sessions: new Set(), secs: [] });
    const e = toolMap.get(t)!; e.views++; if (r.session_id) e.sessions.add(r.session_id as string);
  }
  for (const r of leaves) {
    const t = (r.tool_slug as string) || "unknown";
    if (toolMap.has(t) && typeof r.duration_seconds === "number") toolMap.get(t)!.secs.push(r.duration_seconds);
  }
  const perTool: ToolStat[] = Array.from(toolMap.entries())
    .map(([tool, e]) => ({ tool, views: e.views, visitors: e.sessions.size, avgSeconds: Math.round(avg(e.secs)) }))
    .sort((a, b) => b.views - a.views);

  // daily
  const dayMap = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) dayMap.set(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10), 0);
  for (const r of views) { const d = String(r.created_at).slice(0, 10); if (dayMap.has(d)) dayMap.set(d, (dayMap.get(d) ?? 0) + 1); }

  return {
    configured: true, days,
    pageViews: views.length, uniqueVisitors: uniq,
    returningRate: views.length ? returning / views.length : 0,
    avgDurationSeconds: Math.round(avg(durations)), avgScrollDepth: Math.round(avg(scrolls)),
    perTool,
    referrers: tally(views, "referrer", 8), devices: tally(views, "device_type"),
    browsers: tally(views, "browser", 6), countries: tally(views, "country", 8),
    clicks: tally(clicks, "target", 12),
    daily: Array.from(dayMap.entries()).map(([date, v]) => ({ date, views: v })),
  };
}
