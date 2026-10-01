import { ShaderBackground } from "@/components/ui/shader-b3e94fd7"
import Magnetic from "@/components/Magnetic"
import { PROFILE } from "@/lib/data"
import { scrollTo } from "@/lib/scroll"
import { ArrowUp } from "lucide-react"

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <ShaderBackground className="contact-shader" />
      <div className="contact-veil" />
      <div className="contact-inner">
        <p className="eyebrow mono" data-reveal>
          <span>05</span> Contact
        </p>
        <h2 className="contact-title" data-reveal>
          Have an idea?
          <br />
          <span className="muted">Let's build it.</span>
        </h2>

        <div className="contact-cta" data-reveal>
          <Magnetic strength={0.45}>
            <a href={`mailto:${PROFILE.email}`} className="cta-orb" data-cursor="Say hi">
              <span>Get in touch</span>
            </a>
          </Magnetic>
          <a href={`mailto:${PROFILE.email}`} className="contact-email link-underline">
            {PROFILE.email}
          </a>
        </div>

        <footer className="footer">
          <div className="footer-links">
            <Magnetic>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="pill">
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="pill">
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${PROFILE.email}`} className="pill">
                Email
              </a>
            </Magnetic>
          </div>
          <div className="footer-meta mono">
            <span>© {new Date().getFullYear()} {PROFILE.name}</span>
            <span className="muted">Built with React, Three.js & GSAP</span>
            <button className="to-top" onClick={() => scrollTo(0)} aria-label="Back to top">
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
