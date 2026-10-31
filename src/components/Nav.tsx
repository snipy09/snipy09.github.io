import { useEffect, useState } from "react"
import { PROFILE } from "@/lib/data"
import { scrollTo } from "@/lib/scroll"

const LINKS = [
  { href: "#areas", label: "What I do" },
  { href: "#nomadic", label: "Nomadic" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]

export function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return
  e.preventDefault()
  scrollTo(href)
  history.replaceState(null, "", href)
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="nav-name" href="#top" onClick={(e) => go(e, "#top")}>
        {PROFILE.name}
      </a>
      <nav aria-label="Sections">
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href} className={l.href === "#areas" || l.href === "#nomadic" ? "wide-only" : ""}>
              <a href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
