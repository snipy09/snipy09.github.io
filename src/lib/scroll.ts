import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Shared, mutable scroll state read every frame by the WebGL scene. */
export const scrollState = {
  progress: 0,
  velocity: 0,
  /** 0..1 while the disciplines section is pinned */
  spread: 0,
  pointerX: 0,
  pointerY: 0,
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

let lenis: Lenis | null = null

export function initScroll() {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollState.progress = max > 0 ? window.scrollY / max : 0
  }

  if (prefersReducedMotion()) {
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }

  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
  lenis.on("scroll", (l: Lenis) => {
    scrollState.progress = l.progress || 0
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

export function scrollTo(target: string | number) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6, offset: 0 })
  else if (typeof target === "string") document.querySelector(target)?.scrollIntoView()
  else window.scrollTo(0, target)
}

export function stopScroll(stop: boolean) {
  if (!lenis) {
    document.documentElement.style.overflow = stop ? "hidden" : ""
    return
  }
  if (stop) lenis.stop()
  else lenis.start()
}
