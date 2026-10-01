import { useState } from "react"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"
import { PROFILE } from "@/lib/data"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section className="section section-alt" id="contact" aria-labelledby="contact-title">
      <div className="container contact reveal">
        <h2 id="contact-title" className="contact-title">
          Have a project or role in mind?
        </h2>
        <p className="section-lede">
          Tell me what you're working on. Email is the quickest way to reach me.
        </p>
        <div className="contact-actions">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary btn-lg">
            <Mail size={18} strokeWidth={1.75} aria-hidden /> {PROFILE.email}
          </a>
          <button className="btn btn-ghost btn-lg" onClick={copy} aria-live="polite">
            {copied ? <Check size={18} strokeWidth={1.75} aria-hidden /> : <Copy size={18} strokeWidth={1.75} aria-hidden />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <ul className="socials">
          <li>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="link">
              GitHub <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
          </li>
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="link">
              LinkedIn <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
