import { useEffect, useState } from "react"
import { PROFILE } from "@/lib/data"
import { scrollTo } from "@/lib/scroll"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#disciplines", label: "Disciplines" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]

function useClock(tz: string) {
  const [t, setT] = useState("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [tz])
  return t
}

export default function Nav() {
  const time = useClock(PROFILE.timezone)
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
      <div className="nav-meta mono">
        <span className="pulse" /> Available · {time} IST
      </div>
    </header>
  )
}
