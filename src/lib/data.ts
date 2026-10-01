export const PROFILE = {
  name: "Sajal Mishra",
  first: "Sajal",
  last: "Mishra",
  email: "sajalmishra0906@gmail.com",
  github: "https://github.com/snipy09",
  linkedin: "https://www.linkedin.com/in/sajalmishra03",
  location: "India",
  timezone: "Asia/Kolkata",
  roles: [
    "AI engineer.",
    "quant developer.",
    "full-stack builder.",
    "automation engineer.",
    "product designer.",
    "founder.",
  ],
  lede: "Quant tools, automation and web products. Idea to production.",
  statement: "I build the model, the pipeline and the interface. Then I ship it.",
  stats: [
    { value: "06", label: "Disciplines" },
    { value: "16", label: "Public repos" },
    { value: "15+", label: "Live deploys" },
    { value: "12", label: "Featured projects" },
  ],
}

export interface Discipline {
  index: string
  title: string
  kicker: string
  body: string
  tags: string[]
  work: string[]
}

export const DISCIPLINES: Discipline[] = [
  {
    index: "01",
    title: "AI Engineering",
    kicker: "Agents & LLMs",
    body: "LLM features and agents inside real products.",
    tags: ["Claude", "OpenAI", "LangChain", "RAG"],
    work: ["Nomadic", "AutoPilot", "Ads Dashboard"],
  },
  {
    index: "02",
    title: "Quant & Finance",
    kicker: "Risk & research",
    body: "Regime detection, portfolio optimisation, market-data QA.",
    tags: ["NumPy", "SciPy", "HMM", "Plotly"],
    work: ["RegimeGuard", "QuantumPort", "MarketGuard"],
  },
  {
    index: "03",
    title: "Full-stack",
    kicker: "Schema to pixel",
    body: "CRMs, dashboards and SaaS apps teams use daily.",
    tags: ["Next.js", "TypeScript", "FastAPI", "Postgres"],
    work: ["DCuboid CRM", "Kubair", "PulseFlow"],
  },
  {
    index: "04",
    title: "Automation",
    kicker: "Runs itself",
    body: "Bots, scrapers and pipelines that replace manual work.",
    tags: ["Python", "Playwright", "Telegram", "Docker"],
    work: ["Lead Extractor", "Job Bot", "FlashJob"],
  },
  {
    index: "05",
    title: "Design & Web",
    kicker: "Motion-first",
    body: "Sites with 3D, shaders and considered motion.",
    tags: ["Three.js", "GSAP", "Tailwind", "Figma"],
    work: ["Storonix", "Client sites", "This site"],
  },
  {
    index: "06",
    title: "Founder",
    kicker: "Zero to shipped",
    body: "Scope, build, launch, iterate with real users.",
    tags: ["Product", "GTM", "Analytics"],
    work: ["Nomadic", "DCuboid", "Kubair"],
  },
]

export interface Project {
  name: string
  tagline: string
  metric: { value: string; label: string }
  category: string
  year: string
  stack: string[]
  live?: string
  repo?: string
  hue: number
}

export const PROJECTS: Project[] = [
  {
    name: "RegimeGuard",
    tagline: "Early warning for market regime shifts",
    metric: { value: "3-state", label: "Gaussian HMM" },
    category: "Quant",
    year: "2026",
    stack: ["Python", "SVD", "HMM"],
    live: "https://regime-early-warning.vercel.app",
    repo: "https://github.com/snipy09/RSEW",
    hue: 260,
  },
  {
    name: "QuantumPort",
    tagline: "Monte Carlo portfolio optimiser",
    metric: { value: "100k", label: "portfolios in <0.1s" },
    category: "Quant",
    year: "2026",
    stack: ["Python", "SciPy", "NumPy"],
    live: "https://mcs-portfolio-optimizer.vercel.app",
    repo: "https://github.com/snipy09/Monte-carlo-simulation-for-portfolio-optimization",
    hue: 180,
  },
  {
    name: "MarketGuard",
    tagline: "OHLCV validation & anomaly detection",
    metric: { value: "0–100", label: "data quality score" },
    category: "Quant",
    year: "2026",
    stack: ["Python", "scikit-learn", "SQLite"],
    live: "https://ohlcv-market-pipeline.vercel.app",
    repo: "https://github.com/snipy09/OHLCV",
    hue: 150,
  },
  {
    name: "Nomadic",
    tagline: "Career operating system",
    metric: { value: "1", label: "app for the whole search" },
    category: "AI · Product",
    year: "2026",
    stack: ["TypeScript", "Next.js"],
    live: "https://nomadicai.vercel.app",
    hue: 205,
  },
  {
    name: "DCuboid CRM",
    tagline: "Fast CRM for small sales teams",
    metric: { value: "CRM", label: "pipeline & contacts" },
    category: "Full-stack",
    year: "2026",
    stack: ["Next.js", "Postgres"],
    live: "https://crm-dcuboid.vercel.app",
    hue: 30,
  },
  {
    name: "Kubair",
    tagline: "Strategy ideas to backtests",
    metric: { value: "NL→", label: "backtest code" },
    category: "Quant · Product",
    year: "2026",
    stack: ["TypeScript", "Python"],
    live: "https://v1-kubair.vercel.app",
    hue: 100,
  },
  {
    name: "Ads Dashboard",
    tagline: "Meta + Google Ads in one view",
    metric: { value: "2", label: "ad platforms unified" },
    category: "Dashboard",
    year: "2026",
    stack: ["Next.js", "Claude"],
    live: "https://meta-google-ads-integrated-dashboar.vercel.app",
    repo: "https://github.com/snipy09/Meta-google-ads-integrated-dashboard",
    hue: 45,
  },
  {
    name: "Instagram AutoPilot",
    tagline: "Engagement bot with anti-ban limits",
    metric: { value: "24/7", label: "headless, quota-safe" },
    category: "Automation",
    year: "2026",
    stack: ["TypeScript", "Playwright"],
    repo: "https://github.com/snipy09/instagram-automation",
    hue: 320,
  },
  {
    name: "Telegram Job Bot",
    tagline: "Remote job alerts in Telegram",
    metric: { value: "4", label: "job boards merged" },
    category: "Automation",
    year: "2026",
    stack: ["Python", "Docker"],
    repo: "https://github.com/snipy09/telegram-job-bot",
    hue: 190,
  },
  {
    name: "Lead Extractor Pro",
    tagline: "Public listings to clean lead lists",
    metric: { value: "CSV", label: "ready-to-use export" },
    category: "Automation",
    year: "2026",
    stack: ["JavaScript", "Scraping"],
    live: "https://magic-lead-extractor-pro.vercel.app",
    hue: 0,
  },
  {
    name: "PulseFlow",
    tagline: "Marketing site, fully static",
    metric: { value: "SSG", label: "Next.js 15 export" },
    category: "Web",
    year: "2026",
    stack: ["Next.js", "Framer"],
    live: "https://as1-two.vercel.app",
    repo: "https://github.com/snipy09/As1",
    hue: 230,
  },
  {
    name: "Storonix",
    tagline: "Equipment product catalogue",
    metric: { value: "Client", label: "website" },
    category: "Web",
    year: "2026",
    stack: ["HTML", "CSS", "JS"],
    live: "https://storonix-equipment.vercel.app",
    hue: 280,
  },
]

export const STACK = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL"] },
  { group: "AI", items: ["Claude", "OpenAI", "LangChain"] },
  { group: "Web", items: ["React", "Next.js", "FastAPI"] },
  { group: "Quant", items: ["NumPy", "SciPy", "pandas"] },
  { group: "Infra", items: ["Postgres", "Docker", "Vercel"] },
  { group: "Motion", items: ["Three.js", "GSAP", "WebGL"] },
]
