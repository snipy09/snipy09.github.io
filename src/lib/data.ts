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
  statement:
    "I build quant research tools, automation pipelines and web products, and I usually take them all the way from first idea to a live deployment.",
  stats: [
    { value: "06", label: "Disciplines" },
    { value: "16", label: "Public repositories" },
    { value: "15+", label: "Live deployments" },
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
    kicker: "Agents & LLM systems",
    body: "Multi-provider LLM pipelines, autonomous agents and AI features wired into real products — with guardrails, quotas and structured outputs.",
    tags: ["Claude", "OpenAI", "Gemini", "LangChain", "CrewAI", "RAG"],
    work: ["Nomadic", "Instagram AI AutoPilot", "Ads Intelligence"],
  },
  {
    index: "02",
    title: "Quant & Finance",
    kicker: "Models that price risk",
    body: "Regime detection with rolling SVD and Gaussian HMMs, Monte Carlo portfolio optimisation, and market-data validation built for traders.",
    tags: ["NumPy", "SciPy", "HMM", "Ledoit-Wolf", "Isolation Forest", "Plotly"],
    work: ["RegimeGuard", "QuantumPort", "MarketGuard", "Kubair"],
  },
  {
    index: "03",
    title: "Full-stack Product",
    kicker: "From schema to pixel",
    body: "Next.js and React front ends on top of typed APIs and Postgres — CRMs, dashboards and SaaS platforms that teams use daily.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "Postgres", "Supabase"],
    work: ["DCuboid CRM", "PulseFlow", "Kubair"],
  },
  {
    index: "04",
    title: "Automation",
    kicker: "Work that runs itself",
    body: "Scrapers, bots and event-driven pipelines that remove repetitive work: lead extraction, job aggregation, marketing and outreach.",
    tags: ["Python", "Playwright", "Node.js", "Telegram API", "Docker", "Cron"],
    work: ["Lead Extractor Pro", "Telegram Job Bot", "FlashJob Bot"],
  },
  {
    index: "05",
    title: "Design & Web",
    kicker: "Interfaces with taste",
    body: "Monotone, motion-first web design. Landing pages and client sites with 3D, shaders and micro-interactions that feel considered.",
    tags: ["Tailwind", "GSAP", "Three.js", "Framer Motion", "Shaders", "Figma"],
    work: ["Storonix", "Clinic websites", "This site"],
  },
  {
    index: "06",
    title: "Founder",
    kicker: "Zero to shipped",
    body: "I take ideas from a blank repo to a live product — scoping, building, deploying and iterating with real users.",
    tags: ["Product", "Strategy", "GTM", "Vercel", "Analytics"],
    work: ["Nomadic", "DCuboid", "Kubair"],
  },
]

export interface Project {
  name: string
  tagline: string
  category: string
  year: string
  stack: string[]
  live?: string
  repo?: string
  hue: number
}

export const PROJECTS: Project[] = [
  {
    name: "Nomadic",
    tagline: "A universal career OS — AI-assisted planning for where your career goes next.",
    category: "AI · Product",
    year: "2026",
    stack: ["TypeScript", "Next.js", "LLMs"],
    live: "https://nomadicai.vercel.app",
    hue: 205,
  },
  {
    name: "RegimeGuard",
    tagline: "Early-warning system for market regime shifts using rolling SVD subspace drift and a 3-state Gaussian HMM.",
    category: "Quant",
    year: "2026",
    stack: ["Python", "HMM", "SVD"],
    live: "https://regime-early-warning.vercel.app",
    repo: "https://github.com/snipy09/RSEW",
    hue: 260,
  },
  {
    name: "QuantumPort",
    tagline: "Monte Carlo portfolio optimiser — 100k+ portfolios in under 0.1s, SLSQP efficient frontier, Ledoit-Wolf covariance.",
    category: "Quant",
    year: "2026",
    stack: ["Python", "SciPy", "NumPy"],
    live: "https://mcs-portfolio-optimizer.vercel.app",
    repo: "https://github.com/snipy09/Monte-carlo-simulation-for-portfolio-optimization",
    hue: 180,
  },
  {
    name: "MarketGuard",
    tagline: "OHLCV validation and anomaly engine — Z-score, MAD and Isolation Forest ensemble with a FINRA-style quality score.",
    category: "Quant · Data",
    year: "2026",
    stack: ["Python", "scikit-learn", "SQLite"],
    live: "https://ohlcv-market-pipeline.vercel.app",
    repo: "https://github.com/snipy09/OHLCV",
    hue: 150,
  },
  {
    name: "DCuboid CRM",
    tagline: "A clean, fast CRM with a navigation system built for teams that live in their pipeline.",
    category: "Full-stack",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Postgres"],
    live: "https://crm-dcuboid.vercel.app",
    hue: 30,
  },
  {
    name: "Instagram AI AutoPilot",
    tagline: "Stealth AI automation — context-aware comments and DM replies, with an anti-ban engine of jitter, quotas and sleep cycles.",
    category: "AI · Automation",
    year: "2026",
    stack: ["TypeScript", "Playwright", "OpenAI"],
    repo: "https://github.com/snipy09/instagram-automation",
    hue: 320,
  },
  {
    name: "Ads Intelligence",
    tagline: "Meta + Google Ads in one dashboard, with Claude generating the insights.",
    category: "AI · Dashboard",
    year: "2026",
    stack: ["Next.js", "Claude", "Ads APIs"],
    live: "https://meta-google-ads-integrated-dashboar.vercel.app",
    repo: "https://github.com/snipy09/Meta-google-ads-integrated-dashboard",
    hue: 45,
  },
  {
    name: "Kubair",
    tagline: "Trading and strategy workspace that turns natural-language ideas into backtests.",
    category: "Quant · Product",
    year: "2026",
    stack: ["TypeScript", "Python", "React"],
    live: "https://v1-kubair.vercel.app",
    hue: 100,
  },
  {
    name: "PulseFlow",
    tagline: "Static-exported B2B platform for a real-time workflow engine — Next.js 15, React 19, Framer Motion.",
    category: "Web",
    year: "2026",
    stack: ["Next.js 15", "React 19", "Framer"],
    live: "https://as1-two.vercel.app",
    repo: "https://github.com/snipy09/As1",
    hue: 230,
  },
  {
    name: "Telegram Job Bot",
    tagline: "Aggregates Remotive, RemoteOK, Arbeitnow and Jobicy into keyword alerts, search and bookmarks.",
    category: "Automation",
    year: "2026",
    stack: ["Python", "Telegram", "Docker"],
    repo: "https://github.com/snipy09/telegram-job-bot",
    hue: 190,
  },
  {
    name: "Lead Extractor Pro",
    tagline: "Scraping toolkit that turns the open web into a clean lead list.",
    category: "Automation",
    year: "2026",
    stack: ["JavaScript", "Scraping"],
    live: "https://magic-lead-extractor-pro.vercel.app",
    hue: 0,
  },
  {
    name: "Storonix",
    tagline: "Product catalogue website for an equipment brand.",
    category: "Client · Web",
    year: "2026",
    stack: ["HTML", "CSS", "JS"],
    live: "https://storonix-equipment.vercel.app",
    hue: 280,
  },
]

export const STACK = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"] },
  { group: "AI", items: ["Claude", "OpenAI", "Gemini", "LangChain", "CrewAI", "RAG"] },
  { group: "Web", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind"] },
  { group: "Quant", items: ["NumPy", "SciPy", "pandas", "scikit-learn", "Plotly"] },
  { group: "Data & Infra", items: ["Postgres", "Supabase", "Docker", "Vercel", "Git"] },
  { group: "Motion", items: ["GSAP", "Three.js", "Framer Motion", "WebGL"] },
]
