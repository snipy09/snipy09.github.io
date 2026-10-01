import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { initScroll, stopScroll } from "@/lib/scroll"
import Preloader from "@/components/Preloader"
import Nav from "@/components/Nav"
import Hero from "@/sections/Hero"
import Marquee from "@/sections/Marquee"
import About from "@/sections/About"
import Disciplines from "@/sections/Disciplines"
import Work from "@/sections/Work"
import Stack from "@/sections/Stack"
import Contact from "@/sections/Contact"

const Scene = lazy(() => import("@/components/Scene"))

function hasWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [webgl] = useState(hasWebGL)

  useEffect(() => {
    const cleanup = initScroll()
    stopScroll(true)
    return cleanup
  }, [])

  const onLoaded = useCallback(() => {
    setReady(true)
    stopScroll(false)
  }, [])

  // Generic fade-up for [data-reveal] and 3D tilt for [data-tilt].
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.08, overwrite: true }),
      })
    })

    const tilts = gsap.utils.toArray<HTMLElement>("[data-tilt]")
    const handlers = tilts.map((el) => {
      const rx = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3" })
      const ry = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3" })
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        ry(((e.clientX - r.left) / r.width - 0.5) * 14)
        rx(-((e.clientY - r.top) / r.height - 0.5) * 14)
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
      }
      const leave = () => {
        rx(0)
        ry(0)
      }
      el.addEventListener("mousemove", move)
      el.addEventListener("mouseleave", leave)
      return () => {
        el.removeEventListener("mousemove", move)
        el.removeEventListener("mouseleave", leave)
      }
    })

    // Fonts and pinned sections change layout; recalc once settled.
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(t)
      handlers.forEach((h) => h())
      ctx.revert()
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={onLoaded} />
      {webgl && (
        <Suspense fallback={null}>
          <div className={`scene-wrap ${ready ? "is-ready" : ""}`}>
            <Scene />
          </div>
        </Suspense>
      )}
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Disciplines />
        <Work />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
