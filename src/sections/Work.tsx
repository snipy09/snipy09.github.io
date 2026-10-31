import { useEffect, useState } from "react"
import { PROJECTS, type Category } from "@/lib/data"
import { scrollTo } from "@/lib/scroll"

const FILTERS: ("All" | Category)[] = ["All", "Quant", "AI & web", "Automation"]
const EVENT = "open-project"

/** Lets other sections link straight to an expanded project row. */
export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }))
}

function host(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export default function Work() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      setFilter("All")
      setOpen(id)
      requestAnimationFrame(() => scrollTo(`#work-${id}`))
    }
    window.addEventListener(EVENT, onOpen)
    return () => window.removeEventListener(EVENT, onOpen)
  }, [])

  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter)

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-head">
          <h2 id="work-title" className="section-title">Selected work</h2>
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length
              return (
                <button
                  key={f}
                  type="button"
                  className="filter"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f} <span className="filter-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="work-cols" aria-hidden="true">
          <span>Project</span>
          <span>What it does</span>
          <span>Built with</span>
          <span>Links</span>
        </div>

        <ul className="rows">
          {shown.map((p) => {
            const isOpen = open === p.id
            const hasDetails = p.details.length > 0
            return (
              <li key={p.id} id={`work-${p.id}`} className={`row ${isOpen ? "is-open" : ""}`}>
                <div className="row-main">
                  <div className="row-name">
                    <h3>{p.name}</h3>
                    <span className="row-meta">
                      {p.category}
                      {p.status ? `, ${p.status.toLowerCase()}` : ""}
                    </span>
                  </div>
                  <p className="row-summary">{p.summary}</p>
                  <p className="row-stack">{p.stack.join(", ")}</p>
                  <div className="row-links">
                    {p.live && (
                      <a className="text-link" href={p.live} target="_blank" rel="noreferrer" title={host(p.live)}>
                        Live site
                      </a>
                    )}
                    {p.sites?.map((site) => (
                      <a key={site.href} className="text-link" href={site.href} target="_blank" rel="noreferrer">
                        {site.label}
                      </a>
                    ))}
                    {p.repo && (
                      <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
                        Source code
                      </a>
                    )}
                    {hasDetails && (
                      <button
                        type="button"
                        className="row-toggle"
                        aria-expanded={isOpen}
                        aria-controls={`details-${p.id}`}
                        onClick={() => setOpen(isOpen ? null : p.id)}
                      >
                        {isOpen ? "Hide details" : "How it works"}
                      </button>
                    )}
                  </div>
                </div>
                {hasDetails && (
                  <div className="row-details" id={`details-${p.id}`} aria-hidden={!isOpen}>
                    <div className="row-details-inner">
                      <div className="row-details-grid">
                        <ul>
                          {p.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <p className="work-more">
          Everything else, including experiments, is on{" "}
          <a className="text-link" href="https://github.com/snipy09?tab=repositories" target="_blank" rel="noreferrer">
            my GitHub
          </a>
          .
        </p>
      </div>
    </section>
  )
}
