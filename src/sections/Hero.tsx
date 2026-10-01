import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { PROFILE } from "@/lib/data"
import { scrollTo } from "@/lib/scroll"

function Chars({ text }: { text: string }) {
  return (
    <span className="line" aria-label={text}>
      {text.split("").map((c, i) => (
        <span className="char-mask" key={i} aria-hidden>
          <span className="char">{c}</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [role, setRole] = useState(0)

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setRole((r) => (r + 1) % PROFILE.roles.length), 2200)
    return () => clearInterval(id)
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".hero .char", { y: 0, yPercent: 110, rotate: 8 }, { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.045 })
        .to(".hero .fade-up", { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, "-=1.2")
        .to(".hero-rule", { scaleX: 1, duration: 1.4 }, "-=1.2")

      // Title drifts apart on scroll (parallax).
      gsap.to(".hero-title .line:first-child", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".hero-title .line:last-child", {
        xPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".hero-inner", {
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-top">
          <p className="mono fade-up">( Portfolio — 2026 )</p>
          <p className="mono fade-up hero-loc">Based in {PROFILE.location} · Working worldwide</p>
        </div>

        <h1 className="hero-title">
          <Chars text={PROFILE.first} />
          <Chars text={PROFILE.last} />
        </h1>

        <div className="hero-rule" />

        <div className="hero-bottom">
          <p className="hero-role fade-up">
            <span className="muted">Jack of all trades —</span>
            <span className="role-slot">
              <span className="role-word" key={role}>
                {PROFILE.roles[role]}
              </span>
            </span>
          </p>
          <div className="hero-side fade-up">
            <p className="hero-lede">{PROFILE.lede}</p>
            <div className="hero-ctas">
              <button className="btn btn-light" onClick={() => scrollTo("#work")}>
                View work
              </button>
              <a className="btn btn-outline" href={`mailto:${PROFILE.email}`}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
