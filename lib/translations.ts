export type Lang = "en" | "sv";

export const t = {
  // ── Navigation ────────────────────────────────────────────────────────────────
  nav: {
    home:         { en: "Home",         sv: "Hem" },
    about:        { en: "About",        sv: "Om mig" },
    tools:        { en: "Tools",        sv: "Verktyg" },
    publications: { en: "Publications", sv: "Publikationer" },
    contact:      { en: "Contact",      sv: "Kontakt" },
    openToWork:   { en: "Open to work", sv: "Öppen för nya möjligheter" },
    downloadCv:   { en: "Download CV",  sv: "Ladda ner CV" },
    downloadCvEn: { en: "Download CV (English)", sv: "Ladda ner CV (Engelska)" },
    cvComingSoon: { en: "Swedish CV coming soon", sv: "Svenska CV kommer snart" },
    openToWorkFull: {
      en: "Open to work — LCA & Sustainability roles, Sweden",
      sv: "Öppen för nya möjligheter — LCA och hållbarhetsroller, Sverige",
    },
  },

  // ── Hero ─────────────────────────────────────────────────────────────────────
  hero: {
    openToWork: {
      en: "Open to work — LCA & Sustainability roles, Sweden",
      sv: "Öppen för nya möjligheter — LCA och hållbarhetsroller, Sverige",
    },
    jobTitle: {
      en: "LCA Specialist & Environmental Scientist",
      sv: "LCA-specialist och miljövetare",
    },
    location:  { en: "Gothenburg, Sweden",  sv: "Göteborg, Sverige" },
    tagline: {
      en: "ISO 14040/44-compliant LCA practitioner. EU Horizon Europe researcher. CSRD certified. Building tools that make environmental data actionable.",
      sv: "Omvandlar produktsystem till miljöinsikter — från råmaterial till slutet av livscykeln.",
    },
    viewWork:    { en: "View my work ↓",  sv: "Se mitt arbete ↓" },
    downloadCv:  { en: "Download CV",     sv: "Ladda ner CV" },
  },

  // ── About ─────────────────────────────────────────────────────────────────────
  about: {
    heading:  { en: "About",  sv: "Om mig" },
    skills:   { en: "Skills", sv: "Kompetenser" },
    bio: {
      p1: {
        en: "I'm an environmental scientist who specialises in Life Cycle Assessment — the methodology behind credible sustainability claims.",
        sv: "Jag är miljövetare med specialisering inom livscykelanalys (LCA) — metoden som ger trovärdiga hållbarhetspåståenden ett vetenskapligt underlag.",
      },
      p2: {
        en: "My hands-on experience comes from the EU Horizon Europe project PVT4EU, where I conducted cradle-to-cradle LCA of novel photovoltaic-thermal collectors, co-authored an official EU deliverable reviewed by project officers, and published in Energy Proceedings (2025).",
        sv: "Min praktiska erfarenhet kommer från EU Horizon Europe-projektet PVT4EU, där jag genomförde en vagga-till-vagga-LCA av nya solpanelskollektorer, var medförfattare till ett officiellt EU-leveransdokument granskat av projektansvariga samt publicerade i Energy Proceedings (2025).",
      },
      p3: {
        en: "I'm certified in CSRD, ESRS, and EU Taxonomy — the regulatory frameworks that are reshaping how Swedish companies report sustainability.",
        sv: "Jag är certifierad inom CSRD, ESRS och EU-taxonomin — de regelramverk som förändrar hur svenska företag rapporterar hållbarhet.",
      },
      p4: {
        en: "Currently based in Gothenburg. English C1. Swedish advancing at SFI.",
        sv: "Baserad i Göteborg. Engelska C1. Svenska på SFI.",
      },
      available: { en: "Available immediately.", sv: "Tillgänglig omedelbart." },
    },
    skillGroups: {
      lcaModelling:         { en: "LCA & Modelling",         sv: "LCA och modellering" },
      sustainabilityReport: { en: "Sustainability Reporting", sv: "Hållbarhetsrapportering" },
      dataTools:            { en: "Data & Tools",             sv: "Data och verktyg" },
      laboratory:           { en: "Laboratory",               sv: "Laboratorium" },
    },
  },

  // ── Credibility bar ───────────────────────────────────────────────────────────
  credibility: {
    euProject:    { en: "EU Project",        sv: "EU-projekt" },
    publications: { en: "Publications",      sv: "Publikationer" },
    certs:        { en: "Certifications",    sv: "Certifieringar" },
    reviewedSop:  { en: "Peer-reviewed SOP", sv: "Granskad SOP" },
  },

  // ── Tools Showcase ────────────────────────────────────────────────────────────
  tools: {
    heading:    { en: "Problems I Solved",                                    sv: "Problem jag har löst" },
    subheading: { en: "Four free tools built for LCA practitioners and sustainability teams", sv: "Fyra kostnadsfria verktyg byggda för LCA-utövare och hållbarhetsteam" },
    openTool:   { en: "Open full tool →",                                     sv: "Öppna verktyget →" },
    liveDemo:   { en: "Live demo — try it now",                               sv: "Livedemonstration — prova nu" },
    theProblem: { en: "The problem",                                          sv: "Problemet" },
    theSolution:{ en: "The solution",                                         sv: "Lösningen" },
    selectProduct: { en: "Select a product",                                  sv: "Välj en produkt" },
    hotspotNote: { en: "Hotspot",                                             sv: "Hotspot" },
    ofLifecycle: { en: "of lifecycle emissions",                              sv: "av livscykelutsläpp" },
    employees:  { en: "Employees (FTE)",                                      sv: "Anställda (heltid)" },
    revenue:    { en: "Revenue (MSEK)",                                       sv: "Omsättning (MSEK)" },
    materialCategories: { en: "Material categories flagged for CSRD reporting. Estimates based on industry averages.", sv: "Väsentliga kategorier markerade för CSRD-rapportering. Uppskattningar baserade på branschgenomsnitt." },
    listedEu:   { en: "Listed (EU)", sv: "Börsnoterad (EU)" },
    yesListed:  { en: "Yes — listed", sv: "Ja — börsnoterad" },
    noPrivate:  { en: "No — private", sv: "Nej — privat" },
    country:    { en: "Country", sv: "Land" },
    csrdApplies:{ en: "✓ CSRD applies from", sv: "✓ CSRD gäller från" },
    csrdWave:   { en: "Required ESRS standards:", sv: "Obligatoriska ESRS-standarder:" },
    csrdNot:    { en: "CSRD does not apply yet (below thresholds)", sv: "CSRD gäller inte ännu (under gränsvärdena)" },
    csrdNote:   { en: "Based on CSRD Directive thresholds. Full assessment requires revenue and asset data.", sv: "Baserat på CSRD-direktivets tröskelvärden. Fullständig bedömning kräver intäkts- och tillgångsdata." },
    whatTypeProduct: { en: "What type of product or system?", sv: "Vilken typ av produkt eller system?" },
    whatScope:  { en: "What system boundary?", sv: "Vilken systembegränsning?" },
    howComplete:{ en: "How complete is your data?", sv: "Hur komplett är din data?" },
    stepOf:     { en: "Step", sv: "Steg" },
    of:         { en: "of", sv: "av" },
    tryAgain:   { en: "← Try again", sv: "← Försök igen" },
    yourLcaEstimate: { en: "Your LCA Estimate", sv: "Din LCA-uppskattning" },
    timeline:   { en: "Timeline", sv: "Tidslinje" },
    weeks:      { en: "weeks", sv: "veckor" },
    estCost:    { en: "Est. cost (SEK)", sv: "Uppskattad kostnad (SEK)" },
    recStandard:{ en: "Recommended standard", sv: "Rekommenderad standard" },
    tools: [
      {
        name: { en: "Carbon Hotspot Finder",   sv: "Carbon Hotspot Finder" },
        problem: { en: "Finding the carbon hotspot in a product's lifecycle takes hours of manual LCA work.", sv: "Att hitta koldioxidhotspoten i en produkts livscykel kräver timmar av manuellt LCA-arbete." },
        solution: { en: "Enter a product. See where 80% of the emissions come from in seconds.", sv: "Ange en produkt. Se var 80 % av utsläppen kommer ifrån på några sekunder." },
        features: {
          en: ["10 product categories from ecoinvent 3.9.1", "5-stage lifecycle breakdown", "IPCC AR6 GWP100 characterisation", "ESRS E1-6 ready summary export"],
          sv: ["10 produktkategorier från ecoinvent 3.9.1", "5-stegs livscykeluppdelning", "IPCC AR6 GWP100-karakterisering", "ESRS E1-6 redo sammanfattningsexport"],
        },
      },
      {
        name: { en: "Scope 3 Simulator",       sv: "Scope 3-simulator" },
        problem: { en: "Swedish SMEs entering CSRD scope have no idea which of their 15 Scope 3 categories are material.", sv: "Svenska SMF som omfattas av CSRD vet inte vilka av sina 15 Scope 3-kategorier som är väsentliga." },
        solution: { en: "Input company size and sector. Get a materiality-ranked Scope 3 profile in under a minute.", sv: "Ange företagets storlek och sektor. Få en väsentlighetsrangordnad Scope 3-profil på under en minut." },
        features: {
          en: ["All 15 GHG Protocol Scope 3 categories", "6 Swedish SME sector profiles", "ESRS E1 disclosure mapping", "Swedish-language interface"],
          sv: ["Alla 15 GHG-protokollets Scope 3-kategorier", "6 svenska SMF-sektorprofiler", "ESRS E1-upplysningskartläggning", "Svenskspråkigt gränssnitt"],
        },
      },
      {
        name: { en: "CSRD Compliance Checker", sv: "CSRD Regelefterlevnadskontroll" },
        problem: { en: "Companies don't know if or when CSRD applies to them, or which ESRS standards they need to follow.", sv: "Företag vet inte om eller när CSRD gäller dem, eller vilka ESRS-standarder de måste följa." },
        solution: { en: "Three inputs. Instant CSRD applicability verdict with required standards list.", sv: "Tre inmatningar. Direkt CSRD-tillämplighetsbeslut med lista över obligatoriska standarder." },
        features: {
          en: ["Covers all 4 CSRD waves (2024-2028)", "Double materiality assessment guide", "Required ESRS standards per wave", "SME-specific guidance included"],
          sv: ["Täcker alla 4 CSRD-vågor (2024–2028)", "Guide för dubbel väsentlighetsbedömning", "Obligatoriska ESRS-standarder per våg", "SMF-specifik vägledning inkluderad"],
        },
      },
      {
        name: { en: "LCA Project Planner",     sv: "LCA Projektplanerare" },
        problem: { en: "Companies that need an LCA don't know how long it takes, what it costs, or what data they need.", sv: "Företag som behöver en LCA vet inte hur lång tid det tar, vad det kostar eller vilken data de behöver." },
        solution: { en: "Answer 3 quick questions. Get a scope, timeline, and budget estimate instantly.", sv: "Svara på 3 snabba frågor. Få omfång, tidslinje och budgetuppskattning direkt." },
        features: {
          en: ["5 product/system categories", "Timeline and cost ranges in SEK", "Recommended ISO standards", "Data collection checklist"],
          sv: ["5 produkt-/systemkategorier", "Tidslinje och kostnadsintervall i SEK", "Rekommenderade ISO-standarder", "Datainsamlingschecklista"],
        },
      },
    ],
  },

  // ── Featured Project ──────────────────────────────────────────────────────────
  featured: {
    heading:     { en: "Featured Project",         sv: "Utvalt projekt" },
    role:        { en: "Role",                     sv: "Roll" },
    org:         { en: "Organisation",             sv: "Organisation" },
    period:      { en: "Period",                   sv: "Period" },
    keyResults:  { en: "Key results",              sv: "Nyckelresultat" },
    peerPub:     { en: "Peer-reviewed publication →", sv: "Granskad publikation →" },
    projectLink: { en: "PVT4EU Project →",         sv: "PVT4EU-projektet →" },
    desc: {
      en: "Conducted cradle-to-cradle LCA and Life Cycle Costing of two novel PVT collector prototypes under the EU Horizon Europe research programme. Co-authored EU Deliverable D6.2 — an official project output reviewed by EU project officers and directly informing Version 2 R&D decisions.",
      sv: "Genomförde vagga-till-vagga-LCA och livscykelkostnadsanalys av två nya PVT-kollektorprototyper inom EU Horizon Europe-forskningsprogrammet. Medförfattade EU-leveransdokument D6.2 — ett officiellt projektresultat granskat av EU-projektansvariga som direkt informerade FoU-besluten för Version 2.",
    },
  },

  // ── Publications ──────────────────────────────────────────────────────────────
  publications: {
    heading:     { en: "Publications & Scientific Output", sv: "Publikationer och vetenskapliga bidrag" },
    available:   { en: "Available on request",            sv: "Tillgänglig på förfrågan" },
    peerReviewed:{ en: "Peer-reviewed internal standard", sv: "Internt granskad standard" },
  },

  // ── Education ─────────────────────────────────────────────────────────────────
  education: {
    heading:      { en: "Education & Certifications", sv: "Utbildning och certifieringar" },
    education:    { en: "Education",                  sv: "Utbildning" },
    certifications:{ en: "Certifications",            sv: "Certifieringar" },
    thesis:       { en: "Thesis:",                    sv: "Examensarbete:" },
    certGroups: {
      csrd: { en: "CSRD & ESG (2025)",          sv: "CSRD och ESG (2025)" },
      data: { en: "Data & Analytics (2022–2023)", sv: "Data och analys (2022–2023)" },
    },
  },

  // ── Testimonials ──────────────────────────────────────────────────────────────
  testimonials: {
    heading:  { en: "What practitioners say",                             sv: "Vad yrkesverksamma säger" },
    subtitle: { en: "From LCA specialists and sustainability teams who use these tools", sv: "Från LCA-specialister och hållbarhetsteam som använder dessa verktyg" },
  },

  // ── Contact ───────────────────────────────────────────────────────────────────
  contact: {
    heading:     { en: "Let's talk",                sv: "Hör av dig" },
    subtext: {
      en: "I'm currently open to LCA specialist, sustainability engineer, ESG/CSRD consultant, and doctoral positions in Sweden and the Nordics.",
      sv: "Jag är öppen för roller inom LCA, hållbarhet, ESG/CSRD och forskarutbildning i Sverige och Norden.",
    },
    orSend:      { en: "Or send a message",         sv: "Eller skicka ett meddelande" },
    name:        { en: "Name",                      sv: "Namn" },
    email:       { en: "Email",                     sv: "E-post" },
    message:     { en: "Message",                   sv: "Meddelande" },
    namePlaceholder:    { en: "Your name",           sv: "Ditt namn" },
    messagePlaceholder: { en: "Tell me about the role or project...", sv: "Berätta om rollen eller projektet..." },
    send:        { en: "Send message →",            sv: "Skicka meddelande →" },
    sending:     { en: "Sending…",                  sv: "Skickar…" },
    sendAnother: { en: "Send another",              sv: "Skicka ett till" },
    successTitle:{ en: "Message sent!",             sv: "Meddelandet skickat!" },
    successSub:  { en: "I'll get back to you within 24 hours.", sv: "Jag återkommer inom 24 timmar." },
    errorMsg:    { en: "Something went wrong. Please email me directly at ansimran300@gmail.com", sv: "Något gick fel. Maila mig direkt på ansimran300@gmail.com" },
  },

  // ── Footer ────────────────────────────────────────────────────────────────────
  footer: {
    role:      { en: "LCA Specialist",   sv: "LCA-specialist" },
    location:  { en: "Gothenburg, Sweden", sv: "Göteborg, Sverige" },
    built:     { en: "Built with purpose", sv: "Byggt med syfte" },
  },
} as const;

export type TranslationKey = keyof typeof t;

/** Retrieve a translation. Falls back to English if the key is missing. */
export function tx(obj: { en: string; sv: string } | undefined, lang: Lang): string {
  if (!obj) return "";
  return obj[lang] || obj.en;
}
