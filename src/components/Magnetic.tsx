import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"

/** Pulls its child toward the cursor on hover — Webflow-style magnetic interaction. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" })
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener("mousemove", move)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
    }
  }, [strength])

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  )
}
