import { scrollTo } from "@/lib/scroll"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#disciplines", label: "Disciplines" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollTo(href)
  }
  return (
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
    </header>
  )
}
