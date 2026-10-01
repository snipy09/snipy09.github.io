import { useEffect, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { PROFILE } from "@/lib/data"
import type { Theme } from "@/hooks/useTheme"

export const NAV = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export default function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const ThemeIcon = theme === "dark" ? Sun : Moon

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden>
            SM
          </span>
          <span>{PROFILE.name}</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link" data-nav={n.id}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <ThemeIcon size={18} strokeWidth={1.75} />
          </button>
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary btn-sm header-cta">
            Get in touch
          </a>
          <button
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${PROFILE.email}`} className="btn btn-primary" onClick={() => setOpen(false)}>
          Email me
        </a>
      </div>
    </header>
  )
}
