import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { scrollState } from "@/lib/scroll"

const ROW_A = ["AI Engineering", "Quant Research", "Full-stack", "Automation", "Design", "Founder"]
const ROW_B = ["Python", "TypeScript", "React", "Next.js", "Three.js", "SciPy", "Claude", "Postgres", "Docker", "GSAP"]

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee-row ${reverse ? "reverse" : ""}`}>
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <span className="marquee-star">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Infinite rows that skew with scroll velocity. */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const set = gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" })
    const tick = () => {
      set(gsap.utils.clamp(-4, 4, scrollState.velocity * -0.12))
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])
  return (
    <div className="marquee" ref={ref} aria-hidden>
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  )
}
