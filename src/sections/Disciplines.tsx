import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DISCIPLINES } from "@/lib/data"
import { scrollState } from "@/lib/scroll"

/** Pinned horizontal gallery on desktop; stacked cards on mobile. Cards tilt in 3D as they travel. */
export default function Disciplines() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!
        const distance = () => t.scrollWidth - window.innerWidth
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => (scrollState.spread = Math.sin(self.progress * Math.PI)),
            onLeave: () => (scrollState.spread = 0),
            onLeaveBack: () => (scrollState.spread = 0),
          },
        })

        gsap.utils.toArray<HTMLElement>(".disc-card").forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -28, z: -160, opacity: 0.35 },
            {
              rotateY: 0,
              z: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "center center",
                scrub: true,
              },
            }
          )
          gsap.to(card, {
            rotateY: 18,
            z: -120,
            opacity: 0.4,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "center center",
              end: "right left",
              scrub: true,
            },
          })
        })
        gsap.to(".disc-progress-fill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + distance(), scrub: true },
        })
      })

      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>(".disc-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            rotateX: -12,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          })
        })
      })
    }, root)
    return () => {
      ctx.revert()
      mm.revert()
      scrollState.spread = 0
    }
  }, [])

  return (
    <section ref={root} className="disciplines" id="disciplines">
      <div className="disc-head">
        <p className="eyebrow mono">
          <span>02</span> Disciplines
        </p>
        <h2 className="disc-title">
          Six trades.
          <br />
          <span className="muted">One toolkit.</span>
        </h2>
        <div className="disc-progress">
          <div className="disc-progress-fill" />
        </div>
      </div>
      <div className="disc-viewport">
        <div className="disc-track" ref={track}>
          {DISCIPLINES.map((d) => (
            <article className="disc-card" key={d.index}>
              <div className="disc-card-top">
                <span className="disc-index">{d.index}</span>
                <span className="mono muted">{d.kicker}</span>
              </div>
              <h3 className="disc-card-title">{d.title}</h3>
              <p className="disc-body">{d.body}</p>
              <div className="disc-foot">
                <div className="tags">
                  {d.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mono disc-work">
                  <span className="muted">Shipped →</span> {d.work.join(" · ")}
                </p>
              </div>
            </article>
          ))}
          <div className="disc-end" aria-hidden>
            <span>Generalist</span>
            <span className="muted">by design.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
