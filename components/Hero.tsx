"use client";

import { useLanguage } from "@/lib/language-context";
import { t, tx } from "@/lib/translations";

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
      {/* Subtle lifecycle loop SVG */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.07]"
        style={{ width: 480, height: 480 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="#15803d" strokeWidth="3" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="55" stroke="#15803d" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M100 20 A80 80 0 0 1 180 100" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <polygon points="180,90 188,108 170,100" fill="#15803d" />
          <path d="M100 180 A80 80 0 0 1 20 100" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <polygon points="20,110 12,92 30,100" fill="#15803d" />
          {[0,72,144,216,288].map((deg, i) => {
            const r = 80;
            const x = 100 + r * Math.sin((deg * Math.PI) / 180);
            const y = 100 - r * Math.cos((deg * Math.PI) / 180);
            return <circle key={i} cx={x} cy={y} r="5" fill="#15803d" />;
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Open to work badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          {tx(t.hero.openToWork, lang)}
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-main tracking-tight leading-tight mb-3">
          Ans Imran Shahid
        </h1>

        {/* Title */}
        <p className="text-lg sm:text-xl font-semibold text-primary mb-1">
          {tx(t.hero.jobTitle, lang)}
        </p>
        <p className="text-sm text-text-secondary mb-6">{tx(t.hero.location, lang)}</p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
          {tx(t.hero.tagline, lang)}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href="#tools"
            className="btn-scale bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {tx(t.hero.viewWork, lang)}
          </a>
          <a
            href="/cv.pdf"
            download="Ans_Imran_Shahid_CV.pdf"
            className="btn-scale border-2 border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-light transition-colors"
          >
            {tx(t.hero.downloadCv, lang)}
          </a>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="https://orcid.org/0009-0009-0434-7988"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors"
          >
            <span className="font-bold text-[#A6CE39]">iD</span>
            <span>ORCID 0009-0009-0434-7988</span>
          </a>
          <span className="text-gray-200">|</span>
          <a
            href="https://www.linkedin.com/in/ans-imran"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors"
          >
            <LinkedInIcon />
            <span>linkedin.com/in/ans-imran</span>
          </a>
          <span className="text-gray-200">|</span>
          <a
            href="mailto:ansimran300@gmail.com"
            className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors"
          >
            <MailIcon />
            <span>ansimran300@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default Hero;
