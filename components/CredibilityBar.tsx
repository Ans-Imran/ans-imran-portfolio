"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function Stat({ value, label, suffix, animate }: { value: number; label: string; suffix: string; animate: boolean }) {
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

  const STATS = [
    { value: 1, label: tx(t.credibility.euProject,    lang), suffix: "" },
    { value: 2, label: tx(t.credibility.publications, lang), suffix: "" },
    { value: 5, label: tx(t.credibility.certs,        lang), suffix: "" },
    { value: 1, label: tx(t.credibility.reviewedSop,  lang), suffix: "" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CredibilityBar;
