export const PROFILE = {
  name: "Sajal Mishra",
  fullName: "Sajal Kumar Mishra",
  email: "sajalmishra0906@gmail.com",
  github: "https://github.com/snipy09",
  linkedin: "https://www.linkedin.com/in/sajalmishra03",
  location: "India",
}

/** Each area also picks the shape of the 3D surface while it is on screen. */
export interface Area {
  id: "quant" | "ai" | "automation"
  title: string
  body: string
  figure: string
  proof: { name: string; href: string }[]
}

export const AREAS: Area[] = [
  {
    id: "ai",
    title: "AI products",
    body: "I put LLM features into real software, with guardrails around them. That means agents that fill in a job application and then wait for you to approve every field, mock interviews with AI feedback, and ad dashboards where Claude writes the weekly summary.",
    figure: "Loss landscape: gradient descent settling into a minimum.",
    proof: [
      { name: "Nomadic", href: "#nomadic" },
      { name: "Ads Insights Dashboard", href: "#work-ads" },
      { name: "Instagram AutoPilot", href: "#work-insta" },
    ],
  },
  {
    id: "quant",
    title: "Quant research tools",
    body: "I write Python tools for market research: spotting regime shifts, optimising portfolios and checking market data before anyone trusts it. Each one ships with a dashboard you can open in a browser.",
    figure: "Implied-volatility surface: a smile across strikes, flattening with time to expiry.",
    proof: [
      { name: "Regime Shift Early Warning", href: "#work-rsew" },
      { name: "Monte Carlo Optimizer", href: "#work-mc" },
      { name: "OHLCV Pipeline", href: "#work-ohlcv" },
      { name: "Kubair", href: "#work-kubair" },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    body: "I build bots, scrapers and pipelines that take a repetitive job off someone's plate and keep doing it on a schedule. They pull jobs from a dozen boards, send alerts, post updates and turn public listings into lead lists.",
    figure: "Periodic waveform: the same job, on schedule, every cycle.",
    proof: [
      { name: "Telegram Job Bot", href: "#work-telegram" },
      { name: "Nomadic job pipeline", href: "#nomadic" },
      { name: "FlashJob Bot", href: "#work-flashjob" },
    ],
  },
]

export const NOMADIC = {
  url: "https://nomadicai.vercel.app",
  download: "https://nomadicai.vercel.app/download",
  summary:
    "Nomadic takes engineering students in India from learning a skill to getting hired. It gives them a learning roadmap, interview practice, a job board matched to what they know, applications filled in for them to review, and one tracker for every application.",
  role: "I'm building all of it: product, design system, the three apps, the backend and the job data pipeline.",
  facts: [
    {
      term: "Three apps, one codebase",
      detail: "Windows and Android are live. macOS is in testing. They share one React UI and one Electron core in a TypeScript monorepo.",
    },
    {
      term: "Apply with review",
      detail: "A form engine reads real application forms, works out what each field asks for and fills it in. It submits nothing until the user has checked every field. I test it against 22 applicant-tracking-system forms.",
    },
    {
      term: "Practice",
      detail: "About 1,800 interview problems from real companies, timed mock rounds and AI feedback, plus about 4,100 guided projects.",
    },
    {
      term: "Job pipeline",
      detail: "Scheduled scrapers pull openings from Internshala, Unstop, Greenhouse, Lever, Ashby and company career sites, then publish them to Supabase.",
    },
    {
      term: "Security and billing",
      detail: "Row-level security on every table. API keys stay in Supabase Vault, never in the apps. Plan limits are enforced on the server.",
    },
  ],
  stack: ["Electron", "React", "TypeScript", "Capacitor", "Supabase", "Playwright"],
  layers: [
    { label: "Apps", items: ["Windows", "macOS", "Android", "Website"] },
    { label: "Shared packages", items: ["UI + design system", "App core", "Form engine", "Learning engine", "Scrapers"] },
    { label: "Backend", items: ["Postgres + RLS", "Edge Functions", "AI proxy", "Vault"] },
  ],
}

export type Category = "Quant" | "AI & web" | "Automation"

export interface Project {
  id: string
  name: string
  category: Category
  summary: string
  details: string[]
  stack: string[]
  live?: string
  repo?: string
  /** Used instead of "Live site" when one entry covers several sites. */
  sites?: { label: string; href: string }[]
  status?: string
}

export const PROJECTS: Project[] = [
  {
    id: "rsew",
    name: "Regime Shift Early Warning",
    category: "Quant",
    summary: "Flags when a market is shifting between calm, stressed and crisis regimes, before the drawdown shows up.",
    details: [
      "Ten engineered features per day: returns, 10/20/50-day volatility, skew, kurtosis, autocorrelation, drawdown and volume change.",
      "A rolling 60-day SVD tracks structural instability. A three-state hidden Markov model labels the regime, with k-means as a fallback.",
      "Warnings are scored with precision, recall and F1 against real drawdown events.",
    ],
    stack: ["Python", "hmmlearn", "Streamlit", "Plotly"],
    live: "https://regime-early-warning.vercel.app",
    repo: "https://github.com/snipy09/RSEW",
  },
  {
    id: "mc",
    name: "Monte Carlo Portfolio Optimizer",
    category: "Quant",
    summary: "Maps the risk and return of every possible mix of a stock universe and finds the best portfolios on the efficient frontier.",
    details: [
      "Runs 10,000+ vectorised simulations, then solves Markowitz analytically with SciPy SLSQP on a Ledoit-Wolf covariance.",
      "Returns four optimal portfolios: max Sharpe, min volatility, max return and max Sortino.",
      "Reports 95% VaR and CVaR, and projects growth for a chosen starting capital.",
    ],
    stack: ["Python", "NumPy", "SciPy", "Streamlit"],
    live: "https://mcs-portfolio-optimizer.vercel.app",
    repo: "https://github.com/snipy09/Monte-carlo-simulation-for-portfolio-optimization",
  },
  {
    id: "ohlcv",
    name: "OHLCV Pipeline",
    category: "Quant",
    summary: "Fetches market data, checks it, fixes it and gives it a quality score before it reaches research.",
    details: [
      "Fetch, validate, flag outliers, adjust for splits and dividends, clean, score, store.",
      "Each dataset gets a 0 to 100 quality score and a letter grade.",
      "Writes to CSV and SQLite, with retries, backoff and rotating logs.",
    ],
    stack: ["Python", "pandas", "SQLite", "Streamlit"],
    live: "https://ohlcv-market-pipeline.vercel.app",
    repo: "https://github.com/snipy09/OHLCV",
  },
  {
    id: "kubair",
    name: "Kubair",
    category: "Quant",
    status: "In progress",
    summary: "Turns a trading idea written in plain English into a Python strategy, backtests it and suggests improvements.",
    details: [
      "The LLM writes a validated strategy spec, not code. Python (NautilusTrader) and Pine Script are generated from that spec by fixed templates, so both always run the same logic.",
      "Every profit-and-loss number comes from the backtest engine, never from the model.",
      "Suggested changes get re-tested on out-of-sample data, and you only see the ones that beat the baseline.",
    ],
    stack: ["Next.js", "FastAPI", "NautilusTrader"],
    live: "https://v1-kubair.vercel.app",
  },
  {
    id: "ads",
    name: "Ads Insights Dashboard",
    category: "AI & web",
    summary: "Shows Meta Ads and Google Ads results in one dashboard. Claude writes the performance summary.",
    details: [
      "Pulls campaign metrics from both ad platforms into a single view.",
      "Claude reads the numbers and writes the takeaways a marketer would otherwise write by hand.",
    ],
    stack: ["Next.js", "Claude API", "Recharts"],
    live: "https://meta-google-ads-integrated-dashboar.vercel.app",
    repo: "https://github.com/snipy09/Meta-google-ads-integrated-dashboard",
  },
  {
    id: "vibe",
    name: "Subreddit Vibe Check",
    category: "AI & web",
    summary: "Reads the top 50 posts of any subreddit and tells you its mood.",
    details: [
      "Sentiment runs in the browser, so no text is sent to a third-party model.",
      "A Next.js route sanitises the input and caches Reddit responses for 60 seconds.",
      "Shows the mix of positive and negative posts, the main emotional drivers and an overall vibe.",
    ],
    stack: ["Next.js", "TypeScript", "NLP"],
    live: "https://subreddit-vibe-check-pi.vercel.app",
    repo: "https://github.com/snipy09/subreddit-vibe-check",
  },
  {
    id: "crm",
    name: "DCuboid CRM",
    category: "AI & web",
    summary: "A lightweight CRM for a small sales team to manage contacts and its pipeline.",
    details: [],
    stack: ["React", "TypeScript", "Vite"],
    live: "https://crm-dcuboid.vercel.app",
  },
  {
    id: "sites",
    name: "Client websites",
    category: "AI & web",
    summary: "Marketing sites for a B2B SaaS, a dental clinic and an equipment supplier.",
    details: [
      "PulseFlow: a fully static Next.js 15 marketing site with Framer Motion.",
      "Dental clinic: a conversion-focused site for a working clinic.",
      "Storonix: a product catalogue for an equipment supplier.",
    ],
    stack: ["Next.js", "React", "Framer Motion"],
    sites: [
      { label: "PulseFlow", href: "https://as1-two.vercel.app" },
      { label: "Dental clinic", href: "https://dentist-clinic-website-pink.vercel.app" },
      { label: "Storonix", href: "https://storonix-equipment.vercel.app" },
    ],
  },
  {
    id: "telegram",
    name: "Telegram Job Bot",
    category: "Automation",
    summary: "Collects remote tech jobs from four boards and sends them to you on Telegram.",
    details: [
      "Pulls from Remotive, RemoteOK, Arbeitnow and Jobicy.",
      "Keyword alerts, instant search and bookmarks, all inside the chat.",
      "Packaged with Docker and deployed on Google Cloud.",
    ],
    stack: ["Python", "Telegram API", "Docker"],
    repo: "https://github.com/snipy09/telegram-job-bot",
  },
  {
    id: "insta",
    name: "Instagram AutoPilot",
    category: "Automation",
    summary: "Engages with relevant posts and replies to DMs for a business account, within strict daily limits.",
    details: [
      "Before engaging, an LLM checks each post against the business's niche. Off-topic posts are skipped.",
      "Hourly and daily caps, random pacing and sleep cycles keep activity at a human level.",
      "A local dashboard shows quotas, settings and live logs.",
    ],
    stack: ["TypeScript", "Playwright", "Express"],
    repo: "https://github.com/snipy09/instagram-automation",
  },
  {
    id: "flashjob",
    name: "FlashJob Marketing Bot",
    category: "Automation",
    summary: "Writes and posts updates for a job-alerts channel across Reddit, X and Discord.",
    details: [
      "Generates platform-specific copy for Reddit, X, LinkedIn and WhatsApp groups.",
      "Posts through separate browser sessions per platform, with cooldowns between them.",
    ],
    stack: ["Python", "Playwright"],
    repo: "https://github.com/snipy09/flashjob-marketing-bot",
  },
  {
    id: "leads",
    name: "Lead Extractor Pro",
    category: "Automation",
    summary: "Turns public business listings into a clean lead list you can export as CSV.",
    details: [],
    stack: ["JavaScript", "Scraping"],
    live: "https://magic-lead-extractor-pro.vercel.app",
  },
]

export const ALSO = [
  {
    title: "CIBC Collections Hackathon 2026",
    where: "IIIT Hyderabad",
    body: "Our team designed a collections platform for a bank with about a million customers spread across 31 tables and no shared customer key. It matches records into one customer view, answers plain-English questions and shows the SQL it ran, and sorts customers by whether they can't pay or won't pay, so agents know whether to call and what to ask for. The AI drafts and a human approves.",
  },
  {
    title: "GitHub Community GITAM",
    where: "Contributor",
    href: "https://github.com/github-community-gitam",
    body: "I contribute to the community's workshops, the EPOCH hackathon and hands-on starter labs on MCP and agentic RAG.",
  },
]

export const TOOLBOX = [
  { group: "Languages", items: "Python, TypeScript, JavaScript, SQL" },
  { group: "Product", items: "React, Next.js, Electron, Capacitor, FastAPI, Node" },
  { group: "Data and quant", items: "NumPy, pandas, SciPy, scikit-learn, hmmlearn, Plotly, Streamlit" },
  { group: "AI", items: "Claude and OpenAI APIs, Gemini, RAG, structured outputs" },
  { group: "Automation", items: "Playwright, scrapers, Telegram bots, cron and CI pipelines" },
  { group: "Infra", items: "Supabase, Postgres, SQLite, Docker, GCP, Vercel" },
  { group: "Interface", items: "Three.js, WebGL shaders, GSAP, Figma" },
]
