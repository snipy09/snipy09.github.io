import { Suspense, lazy } from "react"
import { ArrowDown, MapPin } from "lucide-react"
import { PROFILE } from "@/lib/data"
import type { Theme } from "@/hooks/useTheme"

const GridField = lazy(() => import("@/components/GridField"))

function hasWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}
const WEBGL = typeof document !== "undefined" && hasWebGL()

export default function Hero({ theme }: { theme: Theme }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-meta intro" style={{ ["--d" as string]: "0ms" }}>
            <MapPin size={14} strokeWidth={1.75} aria-hidden />
            {PROFILE.location} · open to freelance and full-time work
          </p>
          <h1 className="hero-title intro" style={{ ["--d" as string]: "60ms" }}>
            I build trading tools, automation and web products.
          </h1>
          <p className="hero-lede intro" style={{ ["--d" as string]: "120ms" }}>
            I'm Sajal, a software engineer who works across the stack, from quantitative models and data pipelines to
            the interfaces people use every day. I usually take a project from first sketch to deployment.
          </p>
          <div className="hero-actions intro" style={{ ["--d" as string]: "180ms" }}>
            <a href="#work" className="btn btn-primary">
              See my work <ArrowDown size={16} strokeWidth={1.75} aria-hidden />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact me
            </a>
          </div>
          <dl className="hero-facts intro" style={{ ["--d" as string]: "240ms" }}>
            <div>
              <dt>Focus</dt>
              <dd>Quant, product, automation</dd>
            </div>
            <div>
              <dt>Shipped</dt>
              <dd>15+ live projects</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Python, TypeScript, React</dd>
            </div>
          </dl>
        </div>
        <div className="hero-visual intro" style={{ ["--d" as string]: "200ms" }}>
          {WEBGL ? (
            <Suspense fallback={<div className="grid-field" />}>
              <GridField theme={theme} />
            </Suspense>
          ) : (
            <div className="grid-field grid-fallback" />
          )}
        </div>
      </div>
    </section>
  )
}
