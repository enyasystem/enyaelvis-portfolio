"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, ChevronRight, Code, Terminal } from "lucide-react"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const phrases = [
    "Building innovative web solutions",
    "Creating AI-powered applications",
    "Designing intuitive user experiences",
    "Developing scalable backend systems",
  ]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Typing animation
    const typingInterval = setInterval(() => {
      const currentPhrase = phrases[index]
      if (text.length < currentPhrase.length) {
        setText(currentPhrase.substring(0, text.length + 1))
      } else {
        // Wait a bit before starting to delete
        setTimeout(() => {
          // Start deleting
          const deletingInterval = setInterval(() => {
            if (text.length > 0) {
              setText(text.substring(0, text.length - 1))
            } else {
              clearInterval(deletingInterval)
              setIndex((prevIndex) => (prevIndex + 1) % phrases.length)
            }
          }, 50)

          return () => clearInterval(deletingInterval)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [text, index, phrases])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsla(${Math.random() * 60 + 240}, 70%, 50%, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(130, 90, 255, ${0.2 - distance / 500})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10"></canvas>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
              <div className="flex items-center text-sm text-primary">
                <Code className="mr-2 h-4 w-4" />
                <span>Full-Stack Developer & AI Enthusiast</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              <span className="gradient-text text-glow">Enya Elvis</span>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full my-4 md:my-6"></div>
            </h1>

            <div className="h-16 mb-8">
              <p className="text-lg md:text-xl text-foreground/90 typing-animation">{text}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="text-base group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
                onClick={scrollToProjects}
              >
                <span className="relative z-10">View My Work</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base group border-primary/50 hover:border-primary"
                asChild
              >
                <a href="#contact" className="inline-flex items-center">
                  Get In Touch
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  JS
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  TS
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
                  PY
                </div>
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  AI
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Tech stack specialist with 5+ years experience</span>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl neon-border">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Elvis - Full-Stack Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 inset-0 rounded-full bg-gradient-to-r from-primary/40 to-accent/40 blur-2xl transform scale-110"></div>

              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-card border border-primary/20 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm">Available for hire</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-sm text-foreground/60 mb-2">Scroll to explore</span>
          <ArrowDown className="animate-bounce text-primary" size={20} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
