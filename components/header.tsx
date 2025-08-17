"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Code } from "lucide-react"
import { motion } from "framer-motion"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center mr-2">
            <img src="/myLogo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold gradient-text">enyaelvis.dev</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link href="#about" className="text-foreground/80 hover:text-primary transition-colors animated-border">
              About
            </Link>
            <Link href="#skills" className="text-foreground/80 hover:text-primary transition-colors animated-border">
              Skills
            </Link>
            <Link href="#projects" className="text-foreground/80 hover:text-primary transition-colors animated-border">
              Projects
            </Link>
            <Link href="#timeline" className="text-foreground/80 hover:text-primary transition-colors animated-border">
              Experience
            </Link>
            <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors animated-border">
              Contact
            </Link>
          </nav>
          <ModeToggle />
        </div>

        <div className="md:hidden flex items-center">
          <ModeToggle />
          <button onClick={toggleMenu} className="ml-4 text-foreground p-1" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-card/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#timeline"
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header
