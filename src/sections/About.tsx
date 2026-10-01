import { TOOLS } from "@/lib/data"

const STEPS = [
  { title: "Understand", body: "A short call to pin down the problem, the users and what done looks like." },
  { title: "Plan", body: "A written scope with milestones, so cost and timeline are clear up front." },
  { title: "Build", body: "Working software early, shared on a preview link you can click through." },
  { title: "Ship", body: "Deployment, documentation and a clean handover." },
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <p>
            Most of what I build sits where data meets product: a model or pipeline doing the heavy lifting, and a
            clear interface on top so people can actually use it.
          </p>
          <p>
            I've shipped market research tools, internal business software, bots and client websites. I enjoy the
            maths as much as the pixels, and I'd rather ship something small and solid than something large and
            fragile.
          </p>

          <h3 className="subhead">How I work</h3>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="step-num" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="tools reveal" aria-labelledby="tools-title" style={{ ["--d" as string]: "80ms" }}>
          <h3 id="tools-title" className="subhead">
            Tools I use
          </h3>
          <dl>
            {TOOLS.map((t) => (
              <div key={t.group} className="tool-row">
                <dt>{t.group}</dt>
                <dd>{t.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
