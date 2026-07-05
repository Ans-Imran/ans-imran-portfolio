"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { tx } from "@/lib/translations";
import { useContent } from "@/lib/content-context";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { lang } = useLanguage();
  const t = useContent();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) { setStatus("success"); setName(""); setEmail(""); setMessage(""); }
      else          setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — contact info */}
          <div className="fade-up">
            <h2 className="text-2xl font-bold text-text-main mb-4">{tx(t.contact.heading, lang)}</h2>
            <p className="text-text-secondary leading-relaxed mb-8">{tx(t.contact.subtext, lang)}</p>

            <div className="space-y-3">
              <a href="mailto:ansimran300@gmail.com" className="btn-scale flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary-light transition-colors group">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary group-hover:bg-white transition-colors"><MailIcon /></div>
                <div>
                  <div className="text-xs text-text-secondary">{lang === "sv" ? "E-post" : "Email"}</div>
                  <div className="text-sm font-semibold text-text-main">ansimran300@gmail.com</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/ans-imran" target="_blank" rel="noopener noreferrer" className="btn-scale flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary-light transition-colors group">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary group-hover:bg-white transition-colors"><LinkedInIcon /></div>
                <div>
                  <div className="text-xs text-text-secondary">LinkedIn</div>
                  <div className="text-sm font-semibold text-text-main">linkedin.com/in/ans-imran</div>
                </div>
              </a>
              <a href="https://orcid.org/0009-0009-0434-7988" target="_blank" rel="noopener noreferrer" className="btn-scale flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary-light transition-colors group">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-sm font-bold text-[#A6CE39] group-hover:bg-white transition-colors">iD</div>
                <div>
                  <div className="text-xs text-text-secondary">ORCID</div>
                  <div className="text-sm font-semibold text-text-main">0009-0009-0434-7988</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="fade-up">
            <h3 className="text-base font-semibold text-text-main mb-4">{tx(t.contact.orSend, lang)}</h3>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">✓</div>
                <div className="font-semibold text-green-800">{tx(t.contact.successTitle, lang)}</div>
                <div className="text-sm text-green-700 mt-1">{tx(t.contact.successSub, lang)}</div>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm text-primary hover:underline">
                  {tx(t.contact.sendAnother, lang)}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                    {tx(t.contact.name, lang)}
                  </label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={tx(t.contact.namePlaceholder, lang)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                    {tx(t.contact.email, lang)}
                  </label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                    {tx(t.contact.message, lang)}
                  </label>
                  <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={tx(t.contact.messagePlaceholder, lang)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 resize-none" />
                </div>
                {status === "error" && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {tx(t.contact.errorMsg, lang)}
                  </div>
                )}
                <button type="submit" disabled={status === "sending"} className="btn-scale w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60">
                  {status === "sending" ? tx(t.contact.sending, lang) : tx(t.contact.send, lang)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
}
function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

export default Contact;
