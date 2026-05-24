# Ans Imran Shahid — Portfolio

**Live:** https://ans-imran.vercel.app

Professional portfolio for Ans Imran Shahid, LCA Specialist & Environmental Scientist based in Gothenburg, Sweden. Built to speak directly to employers and PhD supervisors in Sweden's LCA and sustainability sector.

## Screenshot

_[Add screenshot here after deployment]_

## Features

- **Hero section** with open-to-work badge and lifecycle SVG texture
- **Credibility bar** with animated stat counters on scroll
- **About** with grouped skill tags
- **Tools Showcase** — interactive live demos of all 4 tools embedded inline (no navigation required)
- **Featured project** — EU Horizon Europe PVT4EU LCA study
- **Publications** — peer-reviewed articles with DOI links
- **Education & Certifications**
- **Testimonials** — dynamically fetched from Supabase (hidden if empty)
- **Contact form** — sends email via Resend + inserts into Supabase `lca_leads` table
- **Shared tool nav** — green bar linking to all 5 LCA tools

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS animations
- **Database:** Supabase (PostgreSQL) — same instance as lca-project-planner
- **Email:** Resend
- **Animations:** CSS transitions + Intersection Observer (no libraries)
- **Fonts:** Inter (Google Fonts)
- **Deployment:** Vercel

## Run Locally

```bash
git clone https://github.com/Ans-Imran/ans-imran-portfolio.git
cd ans-imran-portfolio
npm install
cp .env.local.example .env.local
# Fill in your environment variables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update CV

1. Replace `public/cv.pdf` with your latest CV file named exactly `cv.pdf`
2. Commit and push — Vercel auto-deploys

```bash
cp /path/to/Ans_Imran_Shahid_CV_Final.pdf public/cv.pdf
git add public/cv.pdf
git commit -m "Update CV"
git push
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `RESEND_FROM` | From address for emails (optional) |
| `NEXT_PUBLIC_SITE_URL` | https://ans-imran.vercel.app |

## Author

**Ans Imran Shahid** — LCA Specialist & Environmental Scientist, Gothenburg, Sweden  
ORCID: [0009-0009-0434-7988](https://orcid.org/0009-0009-0434-7988)  
LinkedIn: [linkedin.com/in/ans-imran](https://www.linkedin.com/in/ans-imran)  
Email: ansimran300@gmail.com

## License

MIT
