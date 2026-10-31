import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { initScroll, lockScroll, scrollState } from "@/lib/scroll"
import Preloader from "@/components/Preloader"
import Nav from "@/components/Nav"
import Hero from "@/sections/Hero"
import Areas from "@/sections/Areas"
import Nomadic from "@/sections/Nomadic"
import Work from "@/sections/Work"
import Also from "@/sections/Also"
import Contact from "@/sections/Contact"

const Surface = lazy(() => import("@/components/Surface"))

function hasWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export default function App() {
  const [webgl] = useState(hasWebGL)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const cleanup = initScroll()
    lockScroll(true)
    return cleanup
  }, [])

  const onLoaded = useCallback(() => {
    scrollState.ready = true
    lockScroll(false)
    setReady(true)
  }, [])

  return (
    <>
      <Preloader onDone={onLoaded} />
      <a className="skip" href="#work">Skip to work</a>
      {webgl && (
        <div className="surface" aria-hidden="true">
          <Suspense fallback={null}>
            <Surface />
          </Suspense>
        </div>
      )}
      <Nav />
      <main>
        <Hero ready={ready} />
        <Areas />
        <Nomadic />
        <Work />
        <Also />
      </main>
      <Contact />
    </>
  )
}
