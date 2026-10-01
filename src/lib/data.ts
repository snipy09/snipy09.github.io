export const PROFILE = {
  name: "Sajal Mishra",
  role: "Software engineer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "sajalmishra0906@gmail.com",
  github: "https://github.com/snipy09",
  linkedin: "https://linkedin.com/in/sajalmishra",
}

export type Category = "Quant" | "Product" | "Automation" | "Web"

export interface Project {
  slug: string
  name: string
  summary: string
  category: Category
  year: string
  stack: string[]
  live?: string
  repo?: string
  /** Featured projects get a write-up and an illustration. */
  details?: string[]
  visual?: "regime" | "frontier" | "candles"
}

export const PROJECTS: Project[] = [
  {
    slug: "regimeguard",
    name: "RegimeGuard",
    summary: "An early-warning system for shifts in market regime.",
    category: "Quant",
    year: "2026",
    stack: ["Python", "NumPy", "Gaussian HMM", "Plotly"],
    live: "https://regime-early-warning.vercel.app",
    repo: "https://github.com/snipy09/RSEW",
    visual: "regime",
    details: [
      "Rolling 60-day SVD tracks how the market's latent factor structure drifts over time.",
      "Three instability measures (singular value change, subspace drift, variance concentration) feed a 3-state Gaussian HMM.",
      "Includes a backtest that moves to cash on risk-off signals, plus a live dashboard.",
    ],
  },
  {
    slug: "quantumport",
    name: "QuantumPort",
    summary: "Monte Carlo portfolio optimiser with an exact efficient frontier.",
    category: "Quant",
    year: "2026",
    stack: ["Python", "SciPy", "NumPy", "Plotly.js"],
    live: "https://mcs-portfolio-optimizer.vercel.app",
    repo: "https://github.com/snipy09/Monte-carlo-simulation-for-portfolio-optimization",
    visual: "frontier",
    details: [
      "Simulates 100,000+ portfolios in under 0.1s using vectorised NumPy and Dirichlet sampling.",
      "SLSQP solves for maximum Sharpe and minimum volatility; Ledoit-Wolf shrinkage cleans the covariance matrix.",
      "Reports VaR, CVaR, Sortino and Calmar ratios in an interactive web terminal.",
    ],
  },
  {
    slug: "marketguard",
    name: "MarketGuard",
    summary: "Validation and anomaly detection for OHLCV market data.",
    category: "Quant",
    year: "2026",
    stack: ["Python", "scikit-learn", "SQLite", "Plotly"],
    live: "https://ohlcv-market-pipeline.vercel.app",
    repo: "https://github.com/snipy09/OHLCV",
    visual: "candles",
    details: [
      "Checks structure, price logic (high ≥ open/close, low ≤ open/close) and date continuity.",
      "Combines rolling z-scores, median absolute deviation and Isolation Forest to flag bad ticks.",
      "Scores each dataset 0–100 and stores clean data to CSV and SQLite.",
    ],
  },
  {
    slug: "nomadic",
    name: "Nomadic",
    summary: "A career operating system for planning, tracking and applying to roles in one place.",
    category: "Product",
    year: "2026",
    stack: ["TypeScript", "Next.js"],
    live: "https://nomadicai.vercel.app",
  },
  {
    slug: "dcuboid",
    name: "DCuboid CRM",
    summary: "A lightweight CRM with fast navigation for small sales teams.",
    category: "Product",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Postgres"],
    live: "https://crm-dcuboid.vercel.app",
  },
  {
    slug: "kubair",
    name: "Kubair",
    summary: "A trading workspace that turns written strategy ideas into backtests.",
    category: "Product",
    year: "2026",
    stack: ["TypeScript", "React", "Python"],
    live: "https://v1-kubair.vercel.app",
  },
  {
    slug: "ads-dashboard",
    name: "Ads Dashboard",
    summary: "Meta and Google Ads performance in a single reporting view.",
    category: "Product",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Ads APIs"],
    live: "https://meta-google-ads-integrated-dashboar.vercel.app",
    repo: "https://github.com/snipy09/Meta-google-ads-integrated-dashboard",
  },
  {
    slug: "instagram-autopilot",
    name: "Instagram AutoPilot",
    summary: "Background engagement bot with daily quotas, randomised timing and a local dashboard.",
    category: "Automation",
    year: "2026",
    stack: ["TypeScript", "Playwright", "Express"],
    repo: "https://github.com/snipy09/instagram-automation",
  },
  {
    slug: "telegram-job-bot",
    name: "Telegram Job Bot",
    summary: "Pulls remote listings from four job boards into keyword alerts, search and bookmarks.",
    category: "Automation",
    year: "2026",
    stack: ["Python", "Telegram API", "Docker"],
    repo: "https://github.com/snipy09/telegram-job-bot",
  },
  {
    slug: "lead-extractor",
    name: "Lead Extractor Pro",
    summary: "Collects business contact details from public listings into a clean export.",
    category: "Automation",
    year: "2026",
    stack: ["JavaScript", "Scraping"],
    live: "https://magic-lead-extractor-pro.vercel.app",
  },
  {
    slug: "pulseflow",
    name: "PulseFlow",
    summary: "Marketing site for a workflow automation product, fully statically exported.",
    category: "Web",
    year: "2026",
    stack: ["Next.js 15", "React 19", "Framer Motion"],
    live: "https://as1-two.vercel.app",
    repo: "https://github.com/snipy09/As1",
  },
  {
    slug: "storonix",
    name: "Storonix",
    summary: "Product catalogue website for an equipment supplier.",
    category: "Web",
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://storonix-equipment.vercel.app",
  },
]

export const CATEGORIES: Category[] = ["Quant", "Product", "Automation", "Web"]

export const SERVICES = [
  {
    title: "Quant & data",
    body: "Research tooling, backtests, risk analytics and the data pipelines that feed them.",
    items: ["Portfolio optimisation", "Regime & risk models", "Market data cleaning"],
  },
  {
    title: "Product engineering",
    body: "Full-stack web apps, dashboards and internal tools that teams use every day.",
    items: ["Next.js & React", "APIs & Postgres", "Auth, billing, deploys"],
  },
  {
    title: "Automation",
    body: "Bots, scrapers and scheduled jobs that take repetitive work off people's plates.",
    items: ["Scraping & extraction", "Telegram & social bots", "Integrations & webhooks"],
  },
  {
    title: "Websites",
    body: "Fast, accessible marketing sites and landing pages with considered motion.",
    items: ["Design to build", "Motion & 3D", "SEO & performance"],
  },
]

export const TOOLS: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  { group: "Front end", items: ["React", "Next.js", "Tailwind", "Three.js"] },
  { group: "Back end", items: ["Node.js", "FastAPI", "Postgres", "Supabase"] },
  { group: "Data", items: ["NumPy", "pandas", "SciPy", "scikit-learn"] },
  { group: "Ops", items: ["Docker", "Vercel", "GitHub Actions", "Playwright"] },
]
