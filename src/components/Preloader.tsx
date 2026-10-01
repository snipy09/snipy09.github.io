import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const NAME = "Sajal Mishra"
const WORDS = ["code", "quant", "automation", "design", "products"]
const COLS = 6

// Read once per page load, so React's double-invoked effects in dev don't flip it.
const SEEN = (() => {
  try {
    const seen = sessionStorage.getItem("seen-intro") === "1"
    sessionStorage.setItem("seen-intro", "1")
    return seen
  } catch {
    return false
  }
})()

/**
 * Name rises letter by letter while a slot cycles through disciplines, then
 * six shutters lift in a stagger to reveal the site. Click or any key skips.
 * Repeat visits in the same session get a short version.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [word, setWord] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fast = reduced || SEEN
    let done = false
    const finish = () => {
      if (done) return
      done = true
      onDone()
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      if (!fast) {
        const state = { i: 0 }
        tl.from(".pl-char", { yPercent: 120, rotate: 6, duration: 0.9, ease: "expo.out", stagger: 0.035 })
          .from(".pl-sub", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" }, 0.35)
          .to(state, {
            i: WORDS.length - 1,
            duration: 1.1,
            ease: "power1.in",
            onUpdate: () => setWord(Math.round(state.i)),
          }, 0.4)
          .to(".pl-line-fill", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
          .to(".pl-content", { yPercent: -30, opacity: 0, duration: 0.55, ease: "power3.in" }, "+=0.1")
      } else {
        tl.set(".pl-content", { opacity: 0 })
      }
      tl.add(finish, fast ? 0 : "-=0.15")
        .to(".pl-col", {
          scaleY: 0,
          duration: fast ? 0.6 : 0.9,
          ease: "expo.inOut",
          stagger: { each: 0.06, from: "center" },
        }, "<")
        .set(root.current, { display: "none" })

      const skip = () => tl.progress() < 0.8 && tl.seek(tl.duration() - 1, false)
      window.addEventListener("keydown", skip, { once: true })
      root.current?.addEventListener("click", skip, { once: true })
    }, root)
    return () => {
      ctx.revert()
    }
  }, [onDone])

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-cols">
        {Array.from({ length: COLS }, (_, i) => (
          <span key={i} className="pl-col" />
        ))}
      </div>
      <div className="pl-content">
        <div className="pl-name">
          {NAME.split("").map((c, i) => (
            <span key={i} className="pl-mask">
              <span className="pl-char">{c === " " ? " " : c}</span>
            </span>
          ))}
        </div>
        <div className="pl-sub">
          <span className="pl-muted">I build</span>
          <span className="pl-slot">
            <span key={word} className="pl-word">
              {WORDS[word]}
            </span>
          </span>
        </div>
        <div className="pl-line">
          <span className="pl-line-fill" />
        </div>
        <p className="pl-hint">Click to skip</p>
      </div>
    </div>
  )
}
