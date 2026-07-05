import { getServiceClient } from "@/lib/supabase";

export async function getContentOverrides(): Promise<Record<string, unknown>> {
  try {
    const client = getServiceClient();
    const { data } = await client
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return (data?.data as Record<string, unknown>) ?? {};
  } catch {
    return {};
  }
}

export interface CvVersion {
  id: number;
  label: string;
  path: string;
  filename: string;
  is_active: boolean;
  created_at: string;
}

export async function getCvVersions(): Promise<{ configured: boolean; rows: CvVersion[] }> {
  try {
    const client = getServiceClient();
    const { data, error } = await client
      .from("cv_versions")
      .select("id,label,path,filename,is_active,created_at")
      .order("created_at", { ascending: false });
    if (error) return { configured: false, rows: [] };
    return { configured: true, rows: (data as CvVersion[]) ?? [] };
  } catch {
    return { configured: false, rows: [] };
  }
}

export interface DayPoint {
  date: string; // YYYY-MM-DD
  views: number;
}

export interface AnalyticsSummary {
  configured: boolean;
  days: number;
  pageViews: number;
  uniqueVisitors: number;
  returningRate: number;      // 0..1
  avgDurationSeconds: number;
  avgScrollDepth: number;     // 0..100
  referrers: Array<{ label: string; count: number }>;
  devices: Array<{ label: string; count: number }>;
  browsers: Array<{ label: string; count: number }>;
  clicks: Array<{ label: string; count: number }>;
  daily: DayPoint[];
}

function tally(rows: Array<Record<string, unknown>>, key: string): Array<{ label: string; count: number }> {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = (r[key] as string) || "Unknown";
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function empty(days: number): AnalyticsSummary {
  return {
    configured: false, days, pageViews: 0, uniqueVisitors: 0, returningRate: 0,
    avgDurationSeconds: 0, avgScrollDepth: 0,
    referrers: [], devices: [], browsers: [], clicks: [], daily: [],
  };
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const since = new Date(Date.now() - days * 86_400_000);
  let client;
  try {
    client = getServiceClient();
  } catch {
    return empty(days);
  }

  const { data, error } = await client
    .from("portfolio_events")
    .select("session_id,event_type,target,device_type,browser,referrer,returned_visitor,duration_seconds,scroll_depth,created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(20_000);

  if (error || !data) return empty(days);

  const views = data.filter((r) => r.event_type === "page_view");
  const leaves = data.filter((r) => r.event_type === "page_leave");
  const clicks = data.filter((r) => r.event_type === "click");

  const uniqueVisitors = new Set(views.map((r) => r.session_id).filter(Boolean)).size;
  const returning = views.filter((r) => r.returned_visitor === true).length;

  const durations = leaves.map((r) => r.duration_seconds).filter((n): n is number => typeof n === "number");
  const scrolls = leaves.map((r) => r.scroll_depth).filter((n): n is number => typeof n === "number");
  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  // daily series
  const dayMap = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    dayMap.set(d, 0);
  }
  for (const r of views) {
    const d = String(r.created_at).slice(0, 10);
    if (dayMap.has(d)) dayMap.set(d, (dayMap.get(d) ?? 0) + 1);
  }

  return {
    configured: true,
    days,
    pageViews: views.length,
    uniqueVisitors,
    returningRate: views.length ? returning / views.length : 0,
    avgDurationSeconds: Math.round(avg(durations)),
    avgScrollDepth: Math.round(avg(scrolls)),
    referrers: tally(views, "referrer").slice(0, 8),
    devices: tally(views, "device_type"),
    browsers: tally(views, "browser").slice(0, 6),
    clicks: tally(clicks, "target").slice(0, 12),
    daily: Array.from(dayMap.entries()).map(([date, views]) => ({ date, views })),
  };
}
