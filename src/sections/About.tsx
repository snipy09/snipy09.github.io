import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { PROFILE } from "@/lib/data"

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text .w",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      )
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = el.dataset.value ?? ""
        const n = parseInt(target, 10)
        if (Number.isNaN(n)) return
        const suffix = target.replace(/^\d+/, "")
        const pad = target.match(/^\d+/)?.[0].length ?? 1
        const o = { v: 0 }
        gsap.to(o, {
          v: n,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(pad, "0") + suffix),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="section about" id="about">
      <p className="eyebrow mono" data-reveal>
        <span>01</span> About
      </p>
      <p className="about-text">
        {PROFILE.statement.split(" ").map((w, i) => (
          <span key={i} className="w">
            {w}{" "}
          </span>
        ))}
      </p>
      <div className="stats">
        {PROFILE.stats.map((s) => (
          <div className="stat" key={s.label} data-reveal>
            <div className="stat-value" data-value={s.value}>
              {s.value}
            </div>
            <div className="stat-label mono">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
