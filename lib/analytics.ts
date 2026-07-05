/**
 * INTEGRATION INSTRUCTIONS
 * ========================
 * Copy this file to your tool's lib/analytics.ts, then:
 *
 * 1. Add to Vercel environment variables (or .env.local):
 *    NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://lca-project-planner.vercel.app/api/track
 *
 * 2. Create a small client wrapper component (e.g. components/AnalyticsInit.tsx):
 *
 *    "use client";
 *    import { useEffect } from "react";
 *    import { initAnalytics } from "@/lib/analytics";
 *    export function AnalyticsInit({ toolSlug }: { toolSlug: string }) {
 *      useEffect(() => initAnalytics({ toolSlug }), [toolSlug]);
 *      return null;
 *    }
 *
 * 3. Add <AnalyticsInit toolSlug="your-tool-slug" /> inside your root layout's <body>.
 *    Valid slugs: lca-planner | carbon-hotspot | scope3-simulator | csrd-checker
 *
 * For the LCA Project Planner itself (this repo), the env var is not needed — the
 * endpoint defaults to the relative /api/track path.
 */

// The portfolio owns its analytics — always post to its own /api/track route.
const ENDPOINT = "/api/track";

function getDeviceType(ua: string): "mobile" | "tablet" | "desktop" {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua))
    return "mobile";
  return "desktop";
}

function getOS(ua: string): string {
  if (/windows phone/i.test(ua)) return "Windows Phone";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x/i.test(ua)) return "macOS";
  if (/windows/i.test(ua)) return "Windows";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

function getBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return "Safari";
  if (/opr|opera/i.test(ua)) return "Opera";
  return "Other";
}

function classifyReferrer(referrer: string): string {
  if (!referrer) return "Direct";
  if (/linkedin\.com/i.test(referrer)) return "LinkedIn";
  if (/google\./i.test(referrer)) return "Google";
  if (/github\.com/i.test(referrer)) return "GitHub";
  if (/twitter\.com|x\.com/i.test(referrer)) return "Twitter/X";
  return "Other";
}

function getOrCreateSessionId(): string {
  const key = "lca_sid";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function checkReturningVisitor(): boolean {
  const key = "lca_rv";
  const returning = localStorage.getItem(key) === "1";
  if (!returning) localStorage.setItem(key, "1");
  return returning;
}

function sendEvent(payload: Record<string, unknown>, useBeacon = false): void {
  const body = JSON.stringify(payload);
  if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    return;
  }
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/** Call once inside a useEffect (no deps) in your root layout. Returns a cleanup fn. */
export function initAnalytics({ toolSlug }: { toolSlug: string }): () => void {
  if (typeof window === "undefined") return () => {};
  // Never track the admin area as portfolio traffic.
  if (window.location.pathname.startsWith("/admin")) return () => {};

  const ua = navigator.userAgent;
  const sessionId = getOrCreateSessionId();
  const startTime = Date.now();
  let maxScroll = 0;

  const onScroll = () => {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    if (total > 0) {
      maxScroll = Math.max(maxScroll, Math.round((scrolled / total) * 100));
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  sendEvent({
    session_id:       sessionId,
    event_type:       "page_view",
    tool_slug:        toolSlug,
    path:             window.location.pathname,
    device_type:      getDeviceType(ua),
    os:               getOS(ua),
    browser:          getBrowser(ua),
    referrer:         classifyReferrer(document.referrer),
    returned_visitor: checkReturningVisitor(),
  });

  // Click tracking — any element (or ancestor) with a data-track attribute.
  const onClick = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest?.("[data-track]");
    if (!el) return;
    sendEvent({
      session_id: sessionId,
      event_type: "click",
      tool_slug:  toolSlug,
      target:     el.getAttribute("data-track") || "unknown",
      path:       window.location.pathname,
    });
  };
  document.addEventListener("click", onClick, { capture: true });

  const onUnload = () => {
    window.removeEventListener("scroll", onScroll);
    sendEvent(
      {
        session_id:       sessionId,
        event_type:       "page_leave",
        tool_slug:        toolSlug,
        path:             window.location.pathname,
        duration_seconds: Math.round((Date.now() - startTime) / 1000),
        scroll_depth:     maxScroll,
      },
      true // use sendBeacon for reliability on unload
    );
  };
  window.addEventListener("beforeunload", onUnload);

  return () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
    window.removeEventListener("beforeunload", onUnload);
  };
}
