import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { AnalyticsInit } from "./AnalyticsInit";
import type { Lang } from "@/lib/translations";

export const metadata: Metadata = {
  title: {
    default: "Ans Imran Shahid — LCA Specialist & Environmental Scientist, Gothenburg",
    template: "%s | Ans Imran Shahid",
  },
  description:
    "Portfolio of Ans Imran Shahid, LCA specialist based in Gothenburg, Sweden. Free tools for LCA, CSRD, Scope 3, and environmental sustainability.",
  keywords: [
    "LCA", "Life Cycle Assessment", "CSRD", "sustainability",
    "Gothenburg", "Sweden", "environmental scientist", "LCA specialist",
  ],
  authors: [{ name: "Ans Imran Shahid", url: "https://www.linkedin.com/in/ans-imran" }],
  openGraph: {
    title:       "Ans Imran Shahid — LCA Specialist",
    description: "EU Horizon Europe LCA researcher. CSRD certified. Open to work in Sweden.",
    url:         "https://ans-imran-portfolio.vercel.app",
    type:        "website",
    locale:      "en_US",
    alternateLocale: ["sv_SE"],
    siteName:    "Ans Imran Shahid",
  },
  twitter: {
    card:        "summary",
    title:       "Ans Imran Shahid — LCA Specialist & Environmental Scientist",
    description: "EU Horizon Europe LCA researcher. CSRD certified. Open to work in Sweden.",
    creator:     "@ans_imran",
  },
  alternates: {
    canonical: "https://ans-imran-portfolio.vercel.app",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ans Imran Shahid",
  jobTitle: "LCA Specialist & Environmental Scientist",
  email: "ansimran300@gmail.com",
  url: "https://ans-imran-portfolio.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/ans-imran",
    "https://orcid.org/0009-0009-0434-7988",
    "https://github.com/Ans-Imran",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gothenburg",
    addressCountry: "SE",
  },
};

function detectLang(acceptLanguage: string | null): Lang {
  if (!acceptLanguage) return "en";
  const langs = acceptLanguage.split(",").map((l) => l.split(";")[0].trim().toLowerCase());
  for (const l of langs) {
    if (l.startsWith("sv")) return "sv";
    if (l.startsWith("en")) return "en";
  }
  return "en";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const acceptLanguage = hdrs.get("accept-language");
  const defaultLang = detectLang(acceptLanguage);

  return (
    <html lang={defaultLang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider defaultLang={defaultLang}>
          <AnalyticsInit toolSlug="portfolio" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
