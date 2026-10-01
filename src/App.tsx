import Header, { NAV } from "@/components/Header"
import Footer from "@/components/Footer"
import Hero from "@/sections/Hero"
import Work from "@/sections/Work"
import Services from "@/sections/Services"
import About from "@/sections/About"
import Contact from "@/sections/Contact"
import { useActiveSection, useReveal } from "@/hooks/useReveal"
import { useTheme } from "@/hooks/useTheme"

const IDS = NAV.map((n) => n.id)

export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()
  useActiveSection(IDS)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero theme={theme} />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
