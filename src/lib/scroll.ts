import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type Shape = "quant" | "ai" | "automation"

/** Shared, mutable state read every frame by the WebGL surface. */
export const scrollState = {
  velocity: 0,
  /** Which function the surface should morph towards. */
  shape: "quant" as Shape,
  /** 0..1 — the surface fades out once the reader is past the "What I do" section. */
  visibility: 1,
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

let lenis: Lenis | null = null

export function initScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on("scroll", (l: Lenis) => {
    scrollState.velocity = l.velocity
    ScrollTrigger.update()
  })
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollTo(target: string) {
  const el = document.querySelector<HTMLElement>(target)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: -72 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })
}
