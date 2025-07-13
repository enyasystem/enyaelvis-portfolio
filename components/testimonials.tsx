"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Project Manager",
    company: "TechSolutions Inc.",
    image: "/placeholder.svg?height=200&width=200",
    text: "Elvis is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills made our project a success. He's not just technically proficient but also great at communicating complex concepts to non-technical stakeholders.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO",
    company: "StartupHub",
    image: "/placeholder.svg?height=200&width=200",
    text: "Working with Elvis was a game-changer for our startup. He quickly understood our vision and implemented solutions that exceeded our expectations. His expertise in both frontend and backend development, combined with his knowledge of AI integration, brought our product to the next level.",
  },
  {
    id: 3,
    name: "Olivia Rodriguez",
    position: "UI/UX Designer",
    company: "DesignCraft",
    image: "/placeholder.svg?height=200&width=200",
    text: "As a designer, I appreciate developers who can bring designs to life exactly as envisioned. Elvis does this and more. His attention to animation details and responsive implementation made our collaboration seamless. He's truly a developer who cares about the user experience.",
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Client Testimonials</h2>
          <p className="section-subheading">What colleagues and clients have to say about working with me.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-primary/10">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden rounded-lg bg-card border border-border p-8 md:p-12 shadow-sm glass-effect">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: current === index ? 1 : 0,
                  x: current === index ? 0 : 100,
                  position: current === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5 }}
                style={{ display: current === index ? "flex" : "none" }}
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 text-center md:text-left">
                  <p className="text-lg mb-6 italic">{testimonial.text}</p>
                  <div>
                    <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                    <p className="text-primary">{testimonial.position}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      current === index ? "bg-gradient-to-r from-primary to-accent w-4" : "bg-muted-foreground/30"
                    }`}
                    onClick={() => {
                      setAutoplay(false)
                      setCurrent(index)
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
