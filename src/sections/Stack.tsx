import { STACK } from "@/lib/data"

export default function Stack() {
  return (
    <section className="section stack" id="stack">
      <p className="eyebrow mono" data-reveal>
        <span>04</span> Toolkit
      </p>
      <div className="stack-grid">
        {STACK.map((g) => (
          <div className="stack-col" key={g.group} data-reveal>
            <p className="mono stack-label">{g.group}</p>
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
