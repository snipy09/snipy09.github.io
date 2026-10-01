import { ArrowUp } from "lucide-react"
import { PROFILE } from "@/lib/data"
import { NAV } from "@/components/Header"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <nav aria-label="Footer" className="footer-nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="link">
          Back to top <ArrowUp size={15} strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </footer>
  )
}
