import { useEffect, useRef } from "react"
import { gsap } from "gsap"

/** Dot + trailing ring. Grows over interactive elements; shows a label for [data-cursor]. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const d = dot.current!
    const r = ring.current!
    document.documentElement.classList.add("has-cursor")

    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" })
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" })
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" })
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" })

    const move = (e: MouseEvent) => {
      document.documentElement.classList.add("cursor-moved")
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]")
      const text = t?.dataset.cursor ?? ""
      r.classList.toggle("is-hover", !!t)
      r.classList.toggle("is-label", !!text)
      if (label.current) label.current.textContent = text
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      document.documentElement.classList.remove("has-cursor", "cursor-moved")
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  )
}
