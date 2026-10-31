import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import {
  siAndroid, siApple, siBinance, siCapacitor, siClaude, siCloudflare, siDiscord, siDocker, siElectron, siFastapi,
  siFigma, siGit, siGithub, siGithubactions, siGooglecloud, siGooglegemini, siGreensock, siInstagram, siJavascript,
  siJupyter, siLangchain, siLinux, siNextdotjs, siNodedotjs, siNumpy, siPandas, siPlotly, siPostgresql, siPython,
  siReact, siReddit, siRedis, siScikitlearn, siScipy, siSqlite, siStreamlit, siSupabase, siTailwindcss, siTelegram,
  siThreedotjs, siTradingview, siTypescript, siVercel, siVite,
} from "simple-icons"
import { prefersReducedMotion } from "@/lib/scroll"

interface Logo { title: string; path: string; hex: string }

// MathWorks asked for its marks to be removed from simple-icons, so this is a drawn stand-in for the MATLAB membrane.
const MATLAB: Logo = {
  title: "MATLAB",
  hex: "E16737",
  path: "M1.5 14.2 7.4 11.8l2.6 1.9C11.6 9 13.4 3.6 15.6 2.5c2 2.3 4.2 9.6 6.9 15.3-1.7-.9-3.6-2.5-5.1-3.6-1.3 2.4-2.9 5.3-4.5 7.3-1.4-2.1-2.9-4.6-4.2-6.4-1 .3-4.4-.6-7.2-.9Z",
}

// Every letter key is a tool I use, in a 60% layout (15 units wide).
const LOGOS: Logo[] = [
  siGithub, siTradingview, siFigma, siPython, MATLAB, siTypescript, siReact, siNextdotjs, siNodedotjs, siThreedotjs, siGreensock, siVercel,
  siNumpy, siPandas, siScipy, siScikitlearn, siPlotly, siJupyter, siStreamlit, siFastapi, siBinance, siJavascript, siApple, siCloudflare,
  siClaude, siGooglegemini, siLangchain, siSupabase, siPostgresql, siSqlite, siRedis, siDocker, siGooglecloud, siAndroid, siReddit,
  siElectron, siCapacitor, siTailwindcss, siVite, siGit, siGithubactions, siLinux, siTelegram, siDiscord, siInstagram,
]

type Spec = [w: number, logo?: boolean]
const ROWS: Spec[][] = [
  [[1], ...Array<Spec>(12).fill([1, true]), [2]],
  [[1.5], ...Array<Spec>(12).fill([1, true]), [1.5]],
  [[1.75], ...Array<Spec>(11).fill([1, true]), [2.25]],
  [[2.25], ...Array<Spec>(10).fill([1, true]), [2.75]],
  [[1.25], [1.25], [1.25], [6.25], [1.25], [1.25], [1.25], [1.25]],
]

interface KeyDef { x: number; y: number; w: number; logo?: Logo }

const KEYS: KeyDef[] = (() => {
  const out: KeyDef[] = []
  let n = 0
  ROWS.forEach((row, y) => {
    let x = 0
    row.forEach(([w, isLogo]) => {
      out.push({ x, y, w, logo: isLogo ? LOGOS[n++] : undefined })
      x += w
    })
  })
  return out
})()
const LOGO_TOTAL = KEYS.filter((k) => k.logo).length

function brand(hex: string) {
  const n = parseInt(hex, 16)
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255
  // Near-black brand colours (GitHub, Vercel, Next.js…) light up white instead.
  return lum < 0.18 ? "#ffffff" : `#${hex}`
}

/** Press a logo: it sinks into the plate and springs back. */
function strike(key: Element) {
  const glyph = key.querySelector(".glyph")
  if (!glyph) return
  key.classList.add("is-lit")
  gsap
    .timeline()
    .to(glyph, { z: -7, duration: 0.08, ease: "power2.out" })
    .to(glyph, { z: 0, duration: 0.45, ease: "back.out(3)" })
}

/** A logo as a slab of glass: a few stacked copies give it thickness, the top one carries the sheen and rim. */
function GlassLogo({ logo, id }: { logo: Logo; id: string }) {
  return (
    <div className="glyph">
      {[3, 2, 1].map((n) => (
        <svg key={n} className={`layer l${n}`} viewBox="0 0 24 24" aria-hidden="true">
          <path d={logo.path} />
        </svg>
      ))}
      <svg className="layer top" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path d={logo.path} fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

/** One extruded box: four walls and a top face, built from CSS 3D planes. */
function Box({ className, children }: { className: string; children?: React.ReactNode }) {
  return (
    <div className={className}>
      <i className="face wall wall-front" />
      <i className="face wall wall-back" />
      <i className="face wall wall-left" />
      <i className="face wall wall-right" />
      <div className="face top">{children}</div>
    </div>
  )
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)
  const reduced = useMemo(prefersReducedMotion, [])
  const exitRef = useRef<() => void>(() => {})

  // Turn the keyboard slightly toward the cursor.
  useEffect(() => {
    const el = scene.current
    if (!el || reduced) return
    const tilt = { rx: 58, rz: 32 }
    const apply = () => (el.style.transform = `rotateX(${tilt.rx}deg) rotateZ(${tilt.rz}deg)`)
    const move = (e: PointerEvent) => {
      gsap.to(tilt, {
        rz: 32 + (e.clientX / innerWidth - 0.5) * 8,
        rx: 58 - (e.clientY / innerHeight - 0.5) * 6,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
        onUpdate: apply,
      })
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [reduced])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    document.documentElement.classList.add("is-loading")
    const finish = () => {
      document.documentElement.classList.remove("is-loading")
      setGone(true)
      onDone()
    }

    const ctx = gsap.context(() => {
      const logos = gsap.utils.shuffle(gsap.utils.toArray<HTMLElement>(".key.has-logo"))
      let exiting = false
      let intro: gsap.core.Timeline | null = null
      let typing: gsap.core.Timeline | null = null

      const exit = () => {
        if (exiting) return
        exiting = true
        intro?.kill()
        typing?.kill()
        logos.forEach((k) => k.classList.add("is-lit"))
        setCount(LOGO_TOTAL)
        gsap
          .timeline({ onComplete: finish })
          .to(".pl-meter", { opacity: 0, y: 10, duration: 0.4, ease: "power2.in" }, 0.15)
          .to(".kb-float", { y: -40, opacity: 0, duration: 0.8, ease: "expo.in" }, 0.2)
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "expo.inOut" }, 0.7)
      }
      exitRef.current = exit

      if (reduced) {
        logos.forEach((k) => k.classList.add("is-lit"))
        setCount(LOGO_TOTAL)
        gsap.to(el, { opacity: 0, duration: 0.3, delay: 0.8, onComplete: finish })
        return
      }

      intro = gsap
        .timeline()
        .from(".kb-float", { opacity: 0, y: 30, duration: 1.2, ease: "expo.out" }, 0)
        .from(".pl-meter", { opacity: 0, y: 8, duration: 0.8, ease: "expo.out" }, 0.3)

      let seen = false
      try {
        seen = sessionStorage.getItem("kb-seen") === "1"
        sessionStorage.setItem("kb-seen", "1")
      } catch {
        /* storage blocked: play the full version */
      }
      const step = seen ? 0.016 : 0.055

      // Logos are struck one at a time; struck logos stay lit, and that count is the progress.
      const tl = (typing = gsap.timeline({ delay: seen ? 0.4 : 0.7 }))
      logos.forEach((k, i) => {
        tl.call(() => {
          strike(k)
          setCount(i + 1)
        }, undefined, i * step)
      })

      Promise.all([new Promise<void>((r) => tl.eventCallback("onComplete", () => r())), document.fonts?.ready]).then(() =>
        gsap.delayedCall(0.3, exit)
      )
    }, el)

    const skip = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " "].includes(e.key)) exitRef.current()
    }
    window.addEventListener("keydown", skip)
    return () => {
      window.removeEventListener("keydown", skip)
      ctx.revert()
      document.documentElement.classList.remove("is-loading")
    }
  }, [onDone, reduced])

  if (gone) return null
  const pct = Math.round((count / LOGO_TOTAL) * 100)

  return (
    <div className="preloader" ref={root} onClick={() => exitRef.current()} role="status" aria-label={`Loading ${pct}%`}>
      <div className="kb-fit">
        <div className="kb-float">
          <div className="kb-scene" ref={scene}>
            <Box className="case" />
            {KEYS.map((k, i) => (
              <div
                key={i}
                className={`key ${k.logo ? "has-logo" : ""}`}
                style={{
                  ["--x" as string]: k.x,
                  ["--y" as string]: k.y,
                  ["--w" as string]: k.w,
                  ["--brand" as string]: k.logo ? brand(k.logo.hex) : undefined,
                }}
                title={k.logo?.title}
                onClick={
                  k.logo
                    ? (e) => {
                        // Clicking a logo presses it; clicking anywhere else skips the intro.
                        e.stopPropagation()
                        strike(e.currentTarget)
                      }
                    : undefined
                }
              >
                {k.logo ? <GlassLogo logo={k.logo} id={`glass-${i}`} /> : <Box className="cap" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-meter" aria-hidden="true">
        <span className="pl-bar"><span style={{ transform: `scaleX(${count / LOGO_TOTAL})` }} /></span>
        <span className="pl-row">
          <span>Loading</span>
          <span>{String(pct).padStart(3, "0")}</span>
        </span>
      </div>
    </div>
  )
}
