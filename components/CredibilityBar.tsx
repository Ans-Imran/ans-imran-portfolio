"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let rafId: number;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    // Cleanup: cancel the animation frame if the component unmounts or
    // deps change before the animation completes (prevents stale state updates
    // when language change causes Stat to remount mid-animation).
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);
  return count;
}

function Stat({ value, label, suffix, animate }: {
  value: number;
  label: string;
  suffix: string;
  animate: boolean;
}) {
  const count = useCountUp(value, 1000, animate);
  return (
    <div className="text-center px-6 py-6">
      <div className="text-3xl font-bold text-text-main">
        {count}{suffix}
      </div>
      <div className="text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
}

export function CredibilityBar() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  // Fixed indices — not keyed on translated label to survive lang changes
  const STATS = [
    { id: "eu",   value: 1, label: tx(t.credibility.euProject,    lang), suffix: "" },
    { id: "pub",  value: 2, label: tx(t.credibility.publications, lang), suffix: "" },
    { id: "cert", value: 5, label: tx(t.credibility.certs,        lang), suffix: "" },
    { id: "sop",  value: 1, label: tx(t.credibility.reviewedSop,  lang), suffix: "" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use a low threshold (0.1) so the animation fires as soon as the
    // bar enters the viewport — the previous 0.4 required 40% visibility
    // simultaneously, which failed on many viewport/scroll combinations.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/*
          Mobile (2-col): only divide-y so each row gets a horizontal
          separator — divide-x was applying a left border to item 3
          (first of the second row) which looked broken.
          Desktop (4-col): divide-x only for vertical column separators.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-y md:divide-y-0 divide-gray-100">
          {STATS.map((stat) => (
            <Stat key={stat.id} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CredibilityBar;
