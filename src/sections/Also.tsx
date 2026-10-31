import { ALSO, TOOLBOX } from "@/lib/data"

export default function Also() {
  return (
    <section id="also" className="also" aria-labelledby="also-title">
      <div className="wrap also-grid">
        <div>
          <h2 id="also-title" className="section-title">Beyond projects</h2>
          {ALSO.map((a) => (
            <article className="also-item" key={a.title}>
              <h3>
                {"href" in a ? (
                  <a className="text-link" href={a.href} target="_blank" rel="noreferrer">
                    {a.title}
                  </a>
                ) : (
                  a.title
                )}
              </h3>
              <p className="also-where">{a.where}</p>
              <p>{a.body}</p>
            </article>
          ))}
        </div>

        <div>
          <h2 className="section-title">Toolbox</h2>
          <dl className="toolbox">
            {TOOLBOX.map((t) => (
              <div key={t.group}>
                <dt>{t.group}</dt>
                <dd>{t.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
