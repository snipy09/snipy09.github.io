import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const WORDS = ["sajal.dev", "sajal.quant", "sajal.ai", "sajal.automation", "sajal.design", "sajal.founder"]

/** Counter + role flashes, then a curtain lift. Calls onDone when the page should animate in. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [word, setWord] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const state = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(state, {
        v: 100,
        duration: reduced ? 0.4 : 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.round(state.v))
          setWord(Math.min(WORDS.length - 1, Math.floor((state.v / 100) * WORDS.length)))
        },
      })
        .to(".pl-bar-fill", { scaleX: 1, duration: reduced ? 0.4 : 2.4, ease: "power2.inOut" }, 0)
        .to(".pl-inner", { yPercent: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "-=0.2")
        .add(onDone, "-=0.75")
        .set(root.current, { display: "none" })
    }, root)
    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={root} className="preloader" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div className="pl-inner">
        <div className="pl-top">
          <span className="mono">Portfolio ©2026</span>
          <span className="mono">Loading experience</span>
        </div>
        <div className="pl-word" key={word}>
          {WORDS[word]}
        </div>
        <div className="pl-bottom">
          <div className="pl-bar">
            <div className="pl-bar-fill" />
          </div>
          <div className="pl-count">{String(count).padStart(3, "0")}</div>
        </div>
      </div>
    </div>
  )
}
