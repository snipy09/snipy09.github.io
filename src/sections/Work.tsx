import { useMemo, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { CATEGORIES, PROJECTS, type Category, type Project } from "@/lib/data"
import ProjectVisual from "@/components/ProjectVisual"

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function Links({ p }: { p: Project }) {
  return (
    <div className="links">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="link">
          Live site <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          <span className="sr-only"> for {p.name} (opens in a new tab)</span>
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="link">
          <GithubIcon /> Code
          <span className="sr-only"> for {p.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function Featured({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className={`featured reveal ${flip ? "is-flipped" : ""}`}>
      <div className="featured-visual">{p.visual && <ProjectVisual kind={p.visual} />}</div>
      <div className="featured-body">
        <p className="kicker">
          {p.category} · {p.year}
        </p>
        <h3 className="featured-title">{p.name}</h3>
        <p className="featured-summary">{p.summary}</p>
        <ul className="featured-points">
          {p.details?.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <ul className="chips" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Links p={p} />
      </div>
    </article>
  )
}

function Card({ p, i }: { p: Project; i: number }) {
  const href = p.live ?? p.repo
  return (
    <article className="card reveal" style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}>
      <p className="kicker">
        {p.category} · {p.year}
      </p>
      <h3 className="card-title">
        <a href={href} target="_blank" rel="noreferrer" className="card-link">
          {p.name}
        </a>
      </h3>
      <p className="card-summary">{p.summary}</p>
      <ul className="chips" aria-label="Built with">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <Links p={p} />
    </article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState<Category | "All">("All")
  const featured = PROJECTS.filter((p) => p.details)
  const rest = useMemo(
    () => PROJECTS.filter((p) => !p.details && (filter === "All" || p.category === filter)),
    [filter]
  )
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PROJECTS.filter((p) => !p.details).length }
    for (const p of PROJECTS) if (!p.details) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [])

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="work-title" className="section-title">
            Selected work
          </h2>
          <p className="section-lede">
            Three in-depth projects from my quant work, followed by products, automation and websites.
          </p>
        </header>

        <div className="featured-list">
          {featured.map((p, i) => (
            <Featured key={p.slug} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="more-head reveal">
          <h3 className="subhead">More projects</h3>
          <div className="filters" role="group" aria-label="Filter projects">
            {(["All", ...CATEGORIES] as const)
              .filter((c) => counts[c])
              .map((c) => (
                <button
                  key={c}
                  className="filter"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c} <span className="filter-count">{counts[c]}</span>
                </button>
              ))}
          </div>
        </div>

        <div className="cards" aria-live="polite">
          {rest.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>

        <p className="more-link reveal">
          <a href="https://github.com/snipy09?tab=repositories" target="_blank" rel="noreferrer" className="link">
            Browse all repositories on GitHub <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          </a>
        </p>
      </div>
    </section>
  )
}
