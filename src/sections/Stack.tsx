import { STACK } from "@/lib/data"

export default function Stack() {
  return (
    <section className="section stack" id="stack">
      <p className="eyebrow mono" data-reveal>
        <span>04</span> Toolkit
      </p>
      <h2 className="section-title" data-reveal>
        The right tool,
        <br />
        <span className="muted">not the familiar one.</span>
      </h2>
      <div className="bento">
        {STACK.map((g, i) => (
          <div className="bento-cell" key={g.group} data-reveal data-tilt>
            <div className="bento-top">
              <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mono">{g.group}</span>
            </div>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
