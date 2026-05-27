import type { Metadata } from "next";
import "./globals.css";
import { SharedToolNav } from "@/components/SharedToolNav";
import { AnalyticsInit } from "./AnalyticsInit";

export const metadata: Metadata = {
  title: "Ans Imran Shahid — LCA Specialist & Environmental Scientist, Gothenburg",
  description:
    "LCA specialist based in Gothenburg, Sweden. EU Horizon Europe researcher. CSRD certified. Open to LCA, sustainability, and ESG roles.",
  keywords: [
    "LCA",
    "Life Cycle Assessment",
    "CSRD",
    "sustainability",
    "Gothenburg",
    "Sweden",
    "environmental scientist",
  ],
  openGraph: {
    title: "Ans Imran Shahid — LCA Specialist",
    description:
      "EU Horizon Europe LCA researcher. CSRD certified. Open to work in Sweden.",
    url: "https://ans-imran.vercel.app",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ans Imran Shahid",
  jobTitle: "LCA Specialist & Environmental Scientist",
  url: "https://ans-imran.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/ans-imran",
    "https://orcid.org/0009-0009-0434-7988",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gothenburg",
    addressCountry: "SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AnalyticsInit toolSlug="portfolio" />
        <SharedToolNav currentTool="" lang="en" />
        {children}
      </body>
    </html>
  );
}
