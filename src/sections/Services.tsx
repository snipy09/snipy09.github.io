import { SERVICES } from "@/lib/data"

export default function Services() {
  return (
    <section className="section section-alt" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="services-title" className="section-title">
            What I can help with
          </h2>
          <p className="section-lede">
            One person across the whole build means fewer handoffs. These are the areas I take on most often.
          </p>
        </header>
        <div className="services">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="service reveal" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-body">{s.body}</p>
              <ul className="service-list">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
