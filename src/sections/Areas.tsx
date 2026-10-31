import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AREAS } from "@/lib/data"
import { scrollState } from "@/lib/scroll"
import { openProject } from "@/sections/Work"
import { go } from "@/components/Nav"

const HERO_FIGURE = "Implied-volatility surface: a smile across strikes, flattening with time to expiry."

export default function Areas() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(-1)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.getElementById("top"),
        start: "top top",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            scrollState.shape = "quant"
            setActive(-1)
          }
        },
      })

      gsap.utils.toArray<HTMLElement>(".area").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              scrollState.shape = AREAS[i].id
              setActive(i)
            }
          },
        })
      })

      // Fade the surface out as the reader leaves this section, so later text sits on plain paper.
      ScrollTrigger.create({
        trigger: root.current,
        start: "bottom 85%",
        end: "bottom 25%",
        onUpdate: (self) => {
          scrollState.visibility = 1 - self.progress
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const figure = active >= 0 ? AREAS[active].figure : HERO_FIGURE

  return (
    <section id="areas" className="areas" ref={root} aria-labelledby="areas-title">
      <div className="wrap areas-grid">
        <div className="areas-copy">
          <h2 id="areas-title" className="section-title">What I do</h2>
          <p className="section-intro">
            Three kinds of work. Underneath all of them is full-stack web development and interface design, so I can take
            a project from the data model to the screen people use.
          </p>

          {AREAS.map((a, i) => (
            <article key={a.id} className={`area ${active === i ? "is-active" : ""}`}>
              <h3 className="area-title">{a.title}</h3>
              <p className="area-body">{a.body}</p>
              <p className="area-proof">
                <span className="area-proof-label">See it in</span>
                {a.proof.map((p, j) => (
                  <span key={p.name}>
                    <a
                      className="text-link"
                      href={p.href}
                      onClick={(e) => {
                        if (p.href.startsWith("#work-")) {
                          e.preventDefault()
                          openProject(p.href.slice(6))
                        } else go(e, p.href)
                      }}
                    >
                      {p.name}
                    </a>
                    {j < a.proof.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>

        <div className="areas-figure" aria-hidden="true">
          <div className="areas-figure-sticky">
            <ol className="areas-index">
              {AREAS.map((a, i) => (
                <li key={a.id} className={active === i ? "is-active" : ""}>
                  {a.title}
                </li>
              ))}
            </ol>
            <p className="figure-caption figure-caption-inline" key={figure}>
              {figure}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
