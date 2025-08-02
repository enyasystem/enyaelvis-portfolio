import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Timeline from "@/components/timeline"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"

import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
