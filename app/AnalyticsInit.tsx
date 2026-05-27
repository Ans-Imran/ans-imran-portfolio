"use client";
import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

export function AnalyticsInit({ toolSlug }: { toolSlug: string }) {
  useEffect(() => {
    initAnalytics({ toolSlug });
  }, [toolSlug]);
  return null;
}
