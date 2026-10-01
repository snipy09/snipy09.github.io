import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { PROJECTS } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

const GithubMark = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

/** Index list with a floating, cursor-following 3D preview card (desktop). */
export default function Work() {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.from(row, {
          yPercent: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 92%" },
        })
      })
    }, root)

    const p = preview.current
    if (!p || window.matchMedia("(pointer: coarse)").matches) return () => ctx.revert()
    const xTo = gsap.quickTo(p, "x", { duration: 0.6, ease: "power3" })
    const yTo = gsap.quickTo(p, "y", { duration: 0.6, ease: "power3" })
    const rTo = gsap.quickTo(p, "rotateY", { duration: 0.8, ease: "power3" })
    let lastX = 0
    const move = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-25, 25, (e.clientX - lastX) * 1.2))
      lastX = e.clientX
    }
    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      ctx.revert()
    }
  }, [])

  const current = active !== null ? PROJECTS[active] : null

  return (
    <section ref={root} className="section work" id="work">
      <div className="work-head">
        <p className="eyebrow mono" data-reveal>
          <span>03</span> Selected work
        </p>
        <h2 className="section-title" data-reveal>
          Shipped<span className="muted">.</span>
        </h2>
      </div>

      <ul className="work-list" onMouseLeave={() => setActive(null)}>
        {PROJECTS.map((p, i) => {
          const href = p.live ?? p.repo
          return (
            <li key={p.name} className="work-row" onMouseEnter={() => setActive(i)}>
              <a href={href} target="_blank" rel="noreferrer" className="work-link">
                <span className="work-idx mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-main">
                  <span className="work-name">{p.name}</span>
                  <span className="work-tagline">{p.tagline}</span>
                </span>
                <span className="work-metric">
                  <strong>{p.metric.value}</strong>
                  <span>{p.metric.label}</span>
                </span>
                <span className="work-stack">
                  {p.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
                <span className="work-arrow">
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </span>
              </a>
              {p.repo && p.live && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="work-repo" aria-label={`${p.name} source on GitHub`}>
                  <GithubMark />
                </a>
              )}
            </li>
          )
        })}
      </ul>

      <div ref={preview} className={`work-preview ${current ? "is-on" : ""}`} aria-hidden>
        {current && (
          <div className="wp-card" style={{ ["--h" as string]: current.hue }}>
            <div className="wp-orb" />
            <div className="wp-grid" />
            <div className="wp-meta">
              <span className="mono">{current.category}</span>
              <span className="mono">{current.year}</span>
            </div>
            <div className="wp-name">{current.name}</div>
            <div className="wp-tag">{current.tagline}</div>
            <div className="wp-stack">
              {current.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="work-more" data-reveal>
        <a href="https://github.com/snipy09?tab=repositories" target="_blank" rel="noreferrer" className="link-underline">
          All repositories on GitHub <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
      </p>
    </section>
  )
}
