import { useState } from "react"
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
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="contact-title">
          Have something to build, or a role to fill?
        </h2>
        <p className="contact-sub">
          I'm open to internships, freelance builds and collaborations. Email is the fastest way to reach me.
        </p>

        <a className="contact-email" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>

        <div className="contact-actions">
          <button type="button" className="btn btn-invert" onClick={copy} aria-live="polite">
            {copied ? "Email copied" : "Copy email"}
          </button>
          <a className="text-link" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <div className="colophon">
          <p>{PROFILE.fullName}, {PROFILE.location}</p>
          <p>
            Built with React, Three.js and GSAP.{" "}
            <a className="text-link" href="https://github.com/snipy09/snipy09.github.io" target="_blank" rel="noreferrer">
              View the source
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
