import { useEffect, useRef, useState } from "react"
import { scrollState, scrollTo, stopScroll } from "@/lib/scroll"
import { gsap } from "gsap"
import { PROFILE } from "@/lib/data"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#disciplines", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  // Thin progress bar tied to page scroll.
  useEffect(() => {
    const set = gsap.quickSetter(bar.current, "scaleX")
    const tick = () => set(scrollState.progress)
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  useEffect(() => {
    stopScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    // Wait a frame so scrolling is re-enabled before jumping.
    requestAnimationFrame(() => scrollTo(href))
  }

  return (
    <>
      <div className="progress" aria-hidden>
        <div ref={bar} className="progress-fill" />
      </div>
      <header className="nav">
        <a href="#top" className="nav-logo" onClick={(e) => go(e, "#top")}>
          <span className="nav-mark">S</span>
          <span className="nav-name">Sajal Mishra</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="roll">
              <span data-text={l.label}>{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a href={`mailto:${PROFILE.email}`} className="nav-cta">
            Let's talk
          </a>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              tabIndex={open ? 0 : -1}
              style={{ ["--i" as string]: i }}
            >
              <span className="menu-idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${PROFILE.email}`} tabIndex={open ? 0 : -1}>
            {PROFILE.email}
          </a>
          <div>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
