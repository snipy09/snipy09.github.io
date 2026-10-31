import { NOMADIC } from "@/lib/data"

export default function Nomadic() {
  return (
    <section id="nomadic" className="nomadic" aria-labelledby="nomadic-title">
      <div className="wrap">
        <header className="nomadic-head">
          <p className="kicker">Current project</p>
          <h2 id="nomadic-title" className="nomadic-title">Nomadic</h2>
          <p className="nomadic-lede">From learning to hired, in one app.</p>
        </header>

        <div className="nomadic-grid">
          <div className="nomadic-copy">
            <p className="nomadic-summary">{NOMADIC.summary}</p>
            <p className="nomadic-role">{NOMADIC.role}</p>
            <div className="nomadic-actions">
              <a className="btn btn-solid" href={NOMADIC.url} target="_blank" rel="noreferrer">
                Visit the website
              </a>
              <a className="btn" href={NOMADIC.download} target="_blank" rel="noreferrer">
                Download the app
              </a>
            </div>
            <p className="stack-line">
              Built with <span>{NOMADIC.stack.join(", ")}</span>
            </p>
          </div>

          <figure className="arch" aria-label="How Nomadic is built">
            {NOMADIC.layers.map((layer) => (
              <div className="arch-layer" key={layer.label}>
                <p className="arch-label">{layer.label}</p>
                <ul className="arch-items">
                  {layer.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
            <figcaption className="figure-caption figure-caption-inline">
              <span className="figure-title">Figure 2</span>
              How it's built. Every app shares the same UI and core packages, so one fix ships to all three.
            </figcaption>
          </figure>
        </div>

        <dl className="facts">
          {NOMADIC.facts.map((f) => (
            <div className="fact" key={f.term}>
              <dt>{f.term}</dt>
              <dd>{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
