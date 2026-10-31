import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { PROFILE, NOMADIC } from "@/lib/data"
import { prefersReducedMotion } from "@/lib/scroll"
import { go } from "@/components/Nav"

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  // The page's one orchestrated entrance: the name rises line by line while the surface draws in.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .from(".hero-line > span", { yPercent: 110, duration: 1.4, stagger: 0.1 }, 0.15)
        .from(".hero-after", { opacity: 0, y: 16, duration: 1.1, stagger: 0.08 }, 0.6)
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section id="top" className="hero" ref={root}>
      <div className="wrap hero-inner">
        <h1 className="hero-name" aria-label={PROFILE.name}>
          <span className="hero-line"><span>Sajal</span></span>
          <span className="hero-line"><span>Mishra</span></span>
        </h1>

        <p className="hero-lede hero-after">
          I build AI products, quant research tools and automation, and I ship them to real users.
        </p>
        <p className="hero-sub hero-after">
          Engineer based in {PROFILE.location}. Right now I'm building{" "}
          <a className="text-link" href={NOMADIC.url} target="_blank" rel="noreferrer">
            Nomadic
          </a>
          , a career app for engineering students that runs on Windows, macOS and Android.
        </p>

        <div className="hero-actions hero-after">
          <a className="btn btn-solid" href="#work" onClick={(e) => go(e, "#work")}>
            See selected work
          </a>
          <a className="btn" href={`mailto:${PROFILE.email}`}>
            Email me
          </a>
          <span className="hero-socials">
            <a className="text-link" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
        </div>
      </div>

      <p className="figure-caption hero-after">
        <span className="figure-title">Figure 1</span>
        An implied-volatility surface, redrawn every frame. Move your cursor across it.
      </p>
    </section>
  )
}
