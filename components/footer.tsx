import Link from "next/link"
import { Github, Heart, Linkedin, Twitter, Mail } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animated-bg opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              enyaelvis<span className="text-foreground">.dev</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs">
              Building innovative web solutions and AI-powered applications that solve real-world problems.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/enyasystem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/enyaelvis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/enyasystem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:enyaelvis@gmail.com"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors animated-border"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors animated-border"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors animated-border"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#timeline"
                  className="text-muted-foreground hover:text-primary transition-colors animated-border"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors animated-border"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors animated-border">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors animated-border">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors animated-border">
                  AI Integration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors animated-border">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors animated-border">
                  Technical Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to my newsletter for the latest updates on tech, AI, and web development.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-muted px-3 py-2 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2 md:mb-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by Enya Elvis</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-primary transition-colors animated-border"
            >
              {/* Privacy Policy */}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors animated-border">
              {/* Terms of Service */}
            </Link>
            <p className="text-muted-foreground">© {currentYear} enyaelvis.dev. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
