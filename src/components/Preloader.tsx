import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import {
  siAndroid, siBinance, siClaude, siDocker, siElectron, siCapacitor, siFastapi, siFigma, siGit, siGithub,
  siGithubactions, siGooglecloud, siGooglegemini, siGreensock, siJavascript, siJupyter, siLangchain, siLinux,
  siNextdotjs, siNodedotjs, siNumpy, siPandas, siPlotly, siPostgresql, siPython, siReact, siRedis, siScikitlearn,
  siScipy, siSqlite, siStreamlit, siSupabase, siTailwindcss, siTelegram, siThreedotjs, siTradingview, siTypescript,
  siVercel, siVite,
} from "simple-icons"
import { prefersReducedMotion } from "@/lib/scroll"

interface Logo { title: string; path: string; hex: string }

// MathWorks asked for its marks to be removed from simple-icons, so this is a drawn stand-in for the MATLAB membrane.
const MATLAB: Logo = {
  title: "MATLAB",
  hex: "E16737",
  path: "M1.5 14.2 7.4 11.8l2.6 1.9C11.6 9 13.4 3.6 15.6 2.5c2 2.3 4.2 9.6 6.9 15.3-1.7-.9-3.6-2.5-5.1-3.6-1.3 2.4-2.9 5.3-4.5 7.3-1.4-2.1-2.9-4.6-4.2-6.4-1 .3-4.4-.6-7.2-.9Z",
}

type Key = { kind: "logo"; logo: Logo } | { kind: "mod"; label: string; w: number; align?: "left" | "right" }

const logo = (l: Logo): Key => ({ kind: "logo", logo: l })
const mod = (label: string, w: number, align?: "left" | "right"): Key => ({ kind: "mod", label, w, align })

// A 13-unit-wide Mac-style layout. Every letter key is a tool I actually use.
const ROWS: Key[][] = [
  [mod("esc", 1, "left"), ...[siGithub, siTradingview, siFigma, siPython, MATLAB, siTypescript, siReact, siNextdotjs, siNodedotjs, siThreedotjs, siGreensock, siVercel].map(logo)],
  [mod("tab", 1.5, "left"), ...[siNumpy, siPandas, siScipy, siScikitlearn, siPlotly, siJupyter, siStreamlit, siFastapi, siBinance, siJavascript].map(logo), mod("delete", 1.5, "right")],
  [mod("caps lock", 1.75, "left"), ...[siClaude, siGooglegemini, siLangchain, siSupabase, siPostgresql, siSqlite, siRedis, siDocker, siGooglecloud].map(logo), mod("return", 2.25, "right")],
  [mod("shift", 2.25, "left"), ...[siElectron, siCapacitor, siAndroid, siTailwindcss, siVite, siGit, siGithubactions, siLinux, siTelegram].map(logo), mod("shift", 1.75, "right")],
]
const LOGO_COUNT = ROWS.flat().filter((k) => k.kind === "logo").length

function glyphColor(hex: string) {
  const n = parseInt(hex, 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  // Near-black brand colours (GitHub, Vercel, Next.js…) light up white instead.
  return lum < 0.18 ? "#ffffff" : `#${hex}`
}

function KeyCap({ k }: { k: Key }) {
  if (k.kind === "mod") {
    return (
      <span className={`kc kc-mod ${k.align === "right" ? "is-right" : ""}`} style={{ ["--w" as string]: k.w }}>
        <span className="kc-label">{k.label}</span>
      </span>
    )
  }
  const color = glyphColor(k.logo.hex)
  return (
    <span className="kc kc-logo" style={{ ["--w" as string]: 1, ["--brand" as string]: color }} title={k.logo.title}>
      <svg viewBox="0 0 24 24" role="img" aria-label={k.logo.title}>
        <path d={k.logo.path} />
      </svg>
    </span>
  )
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)
  const reduced = useMemo(prefersReducedMotion, [])
  const exitRef = useRef<() => void>(() => {})

  // Tilt the keyboard toward the cursor and move the specular highlight with it.
  useEffect(() => {
    const el = board.current
    if (!el || reduced) return
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3" })
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3" })
    const move = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5
      const y = e.clientY / innerHeight - 0.5
      rx(24 - y * 10)
      ry(x * 12)
      el.style.setProperty("--lx", `${(x + 0.5) * 100}%`)
      el.style.setProperty("--ly", `${(y + 0.5) * 100}%`)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [reduced])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    document.documentElement.classList.add("is-loading")

    const ctx = gsap.context(() => {
      const keys = gsap.utils.toArray<HTMLElement>(".kc")
      const logos = gsap.utils.shuffle(gsap.utils.toArray<HTMLElement>(".kc-logo"))
      let exiting = false
      let intro: gsap.core.Timeline | null = null
      let typing: gsap.core.Timeline | null = null

      const exit = () => {
        if (exiting) return
        exiting = true
        intro?.kill()
        typing?.kill()
        logos.forEach((k) => k.classList.add("is-lit"))
        setCount(LOGO_COUNT)
        gsap
          .timeline({
            onComplete: () => {
              document.documentElement.classList.remove("is-loading")
              setGone(true)
              onDone()
            },
          })
          .to(keys, { y: -6, duration: 0.18, stagger: { each: 0.004, from: "center" }, ease: "power2.out" }, 0.05)
          .to(keys, { y: 0, duration: 0.3, stagger: { each: 0.004, from: "center" }, ease: "power2.in" }, 0.25)
          .to(".kb", { rotationX: 0, rotationY: 0, scale: 1.08, duration: 0.8, ease: "expo.inOut" }, 0.3)
          .to(".kb", { yPercent: -18, opacity: 0, duration: 0.6, ease: "expo.in" }, 0.7)
          .to(".pl-hint", { opacity: 0, duration: 0.3 }, 0.2)
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "expo.inOut" }, 0.85)
      }
      exitRef.current = exit

      if (reduced) {
        logos.forEach((k) => k.classList.add("is-lit"))
        setCount(LOGO_COUNT)
        gsap.delayedCall(0.6, () => {
          gsap.to(el, {
            opacity: 0, duration: 0.3, onComplete: () => {
              document.documentElement.classList.remove("is-loading")
              setGone(true)
              onDone()
            },
          })
        })
        return
      }

      intro = gsap
        .timeline()
        .from(".pl-blobs", { opacity: 0, duration: 1.2, ease: "power2.out" }, 0)
        .from(".kb", { rotationX: 62, y: 120, scale: 0.86, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.05)
        .from(keys, { opacity: 0, y: 26, scale: 0.7, duration: 0.8, ease: "back.out(2)", stagger: { each: 0.012, from: "center" } }, 0.2)

      // "Typing": each logo key is struck once and stays lit; lit keys are the progress.
      // Repeat visits in the same tab type faster.
      let seen = false
      try {
        seen = sessionStorage.getItem("kb-seen") === "1"
        sessionStorage.setItem("kb-seen", "1")
      } catch {
        /* storage blocked: play the full version */
      }
      const step = seen ? 0.012 : 0.04
      const tl = (typing = gsap.timeline({ delay: seen ? 0.5 : 0.85 }))
      logos.forEach((k, i) => {
        tl
          .to(k, { y: 3, scale: 0.94, duration: 0.07, ease: "power2.out", onStart: () => { k.classList.add("is-lit"); setCount(i + 1) } }, i * step)
          .to(k, { y: 0, scale: 1, duration: 0.22, ease: "back.out(3)" }, i * step + 0.07)
      })

      // Leave once the typing is done and the page's fonts are ready.
      Promise.all([new Promise<void>((r) => tl.eventCallback("onComplete", () => r())), document.fonts?.ready]).then(() =>
        gsap.delayedCall(0.25, exit)
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
  const pct = Math.round((count / LOGO_COUNT) * 100)

  return (
    <div className="preloader" ref={root} onClick={() => exitRef.current()} role="status" aria-live="polite" aria-label={`Loading ${pct}%`}>
      <div className="pl-blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="blob b4" />
      </div>

      <div className="kb-stage">
        <div className="kb" ref={board}>
          <div className="kb-plate" aria-hidden="true" />
          <div className="kb-keys">
            {ROWS.map((row, r) => (
              <div className="kb-row" key={r}>
                {row.map((k, i) => (
                  <KeyCap key={i} k={k} />
                ))}
              </div>
            ))}
            <div className="kb-row">
              <span className="kc kc-mod" style={{ ["--w" as string]: 1 }}><span className="kc-label">fn</span></span>
              <span className="kc kc-mod" style={{ ["--w" as string]: 1 }}><span className="kc-label">control</span></span>
              <span className="kc kc-mod" style={{ ["--w" as string]: 1 }}><span className="kc-label">option</span></span>
              <span className="kc kc-mod" style={{ ["--w" as string]: 1.25 }}><span className="kc-label">command</span></span>
              <span className="kc kc-space" style={{ ["--w" as string]: 3.5 }}>
                <span className="kc-fill" style={{ transform: `scaleX(${count / LOGO_COUNT})` }} />
                <span className="kc-space-text">{pct < 100 ? `Loading ${pct}%` : "Sajal Mishra"}</span>
              </span>
              <span className="kc kc-mod" style={{ ["--w" as string]: 1.25 }}><span className="kc-label">command</span></span>
              <span className="kc kc-mod" style={{ ["--w" as string]: 1 }}><span className="kc-label">option</span></span>
              <span className="kc kc-mod kc-arrow" style={{ ["--w" as string]: 1 }}><span className="kc-label">◀</span></span>
              <span className="kc-arrows-v" style={{ ["--w" as string]: 1 }}>
                <span className="kc kc-mod kc-arrow kc-half"><span className="kc-label">▲</span></span>
                <span className="kc kc-mod kc-arrow kc-half"><span className="kc-label">▼</span></span>
              </span>
              <span className="kc kc-mod kc-arrow" style={{ ["--w" as string]: 1 }}><span className="kc-label">▶</span></span>
            </div>
          </div>
        </div>
      </div>

      <p className="pl-hint">Click or press return to skip</p>
    </div>
  )
}
