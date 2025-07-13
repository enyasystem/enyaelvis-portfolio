"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, ExternalLink, Maximize2 } from "lucide-react"

// Sample project data
const projects = [
  {
    id: 1,
    title: "Booster Base NG",
    description:
      "A corporate website for an IT training and services company offering professional development programs.",
    image: "/images/boosterbase.png",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS", "Responsive Design"],
    liveUrl: "https://boosterbaseng.com",
    repoUrl: "https://github.com/enyasystem/boosterbase",
    featured: true,
    caseStudy: {
      goal: "Create a professional website for an IT training company that showcases their courses and services while establishing credibility in the tech education space.",
      challenges: [
        "Designing an intuitive course catalog with filtering capabilities",
        "Creating a responsive design that works well on all devices",
        "Implementing a secure student portal for enrolled participants",
      ],
      solutions: [
        "Developed a custom course catalog with advanced search and filtering options",
        "Created a fully responsive design with mobile-first approach",
        "Built a secure student portal with authentication and course tracking",
      ],
      outcomes: [
        "45% increase in course enrollments",
        "Improved user engagement with course materials",
        "Enhanced company brand perception in the IT training market",
      ],
    },
  },
  {
    id: 2,
    title: "Access Capital MIC",
    description:
      "A professional website for a mortgage investment company with secure, high-yield investment opportunities.",
    image: "/images/accesscapital.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    liveUrl: "https://accesscapitalmic.com",
    repoUrl: "https://github.com/enyasystem/accesscapital",
    featured: true,
    caseStudy: {
      goal: "Create a professional, trustworthy online presence for a mortgage investment company that conveys stability and reliability.",
      challenges: [
        "Designing a UI that conveys trust and professionalism in the financial sector",
        "Implementing responsive design for various device sizes",
        "Creating intuitive navigation for different user types (investors, borrowers)",
      ],
      solutions: [
        "Used a dark, sophisticated color scheme with city skyline imagery to convey urban finance",
        "Implemented a fully responsive design with breakpoints for all device sizes",
        "Created separate user journeys for investors and borrowers with targeted content",
      ],
      outcomes: [
        "30% increase in investor inquiries",
        "Improved user engagement metrics",
        "Positive client feedback on professional appearance",
      ],
    },
  },
  {
    id: 3,
    title: "IEC Services",
    description:
      "An educational consultancy website helping students find pathways to world-class education in Canada.",
    image: "/images/iecservices.png",
    technologies: ["WordPress", "PHP", "JavaScript", "Responsive Design", "SEO"],
    liveUrl: "https://iecservices.org",
    repoUrl: "https://github.com/enyasystem/iecservices",
    featured: true,
    caseStudy: {
      goal: "Create a professional website for an educational consultancy that helps students navigate the process of studying in Canada.",
      challenges: [
        "Designing an intuitive interface for prospective students to find relevant programs",
        "Creating a content management system for educational resources and program listings",
        "Implementing multilingual support for international students",
      ],
      solutions: [
        "Developed a user-friendly navigation system with clear pathways for different student needs",
        "Created custom post types for programs, institutions, and resources with advanced filtering",
        "Implemented a responsive design that works across all devices and screen sizes",
      ],
      outcomes: [
        "40% increase in student inquiries",
        "Improved conversion rate for consultation bookings",
        "Enhanced visibility in search engine results for key educational terms",
      ],
    },
  },
  {
    id: 4,
    title: "Milton High School",
    description:
      "An educational website for a Canadian curriculum school, providing information for students, parents, and prospective families.",
    image: "/images/miltonhighschool.png",
    technologies: ["WordPress", "Custom PHP", "CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://miltonhighschool.ng",
    repoUrl: "https://github.com/enyasystem/miltonhighschool",
    featured: true,
    caseStudy: {
      goal: "Develop a modern, user-friendly website for an educational institution that serves both local and international students.",
      challenges: [
        "Creating a content management system that's easy for school staff to update",
        "Designing a site that appeals to both students and parents",
        "Implementing features for online applications and admissions",
      ],
      solutions: [
        "Customized WordPress with a user-friendly admin interface for staff updates",
        "Created a vibrant, engaging design with clear information architecture",
        "Developed custom forms and workflows for the admissions process",
      ],
      outcomes: [
        "50% increase in online applications",
        "Reduced administrative workload for admissions staff",
        "Improved communication with current and prospective students",
      ],
    },
  },
  {
    id: 5,
    title: "Boxed Water NG",
    description: "An e-commerce platform for a bottled water company, featuring online ordering and delivery services.",
    image: "/images/boxedwater.png",
    technologies: ["WooCommerce", "WordPress", "PHP", "JavaScript", "Payment Integration"],
    liveUrl: "https://boxedwater.ng",
    repoUrl: "https://github.com/enyasystem/boxedwater",
    featured: true,
    caseStudy: {
      goal: "Build an e-commerce platform for a water company that enables easy online ordering and delivery management.",
      challenges: [
        "Implementing secure payment processing for Nigerian customers",
        "Creating an efficient inventory and delivery management system",
        "Designing a mobile-first shopping experience",
      ],
      solutions: [
        "Integrated multiple local payment gateways for secure transactions",
        "Developed a custom inventory tracking and delivery scheduling system",
        "Created a responsive, mobile-optimized shopping experience",
      ],
      outcomes: [
        "200% increase in online orders within first 3 months",
        "Streamlined delivery operations and reduced fulfillment time",
        "Expanded customer base beyond local market",
      ],
    },
  },
  {
    id: 6,
    title: "Jeason Steel",
    description:
      "A corporate website for a steel manufacturing company, showcasing products, services, and industry expertise.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Material UI"],
    liveUrl: "https://jeasonsteel.com",
    repoUrl: "https://github.com/enyasystem/jeasonsteel",
    featured: false,
  },
  {
    id: 7,
    title: "GG Clean Experts",
    description: "A professional cleaning service website offering residential and commercial cleaning solutions with online booking and customer management features.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "https://ggcleanexperts.com",
    repoUrl: "https://github.com/enyasystem/ggcleanexperts",
    featured: false,
  },
  {
    id: 8,
    title: "Telegram Bot",
    description:
      "A Telegram bot that uses AI to answer questions, generate content, and provide personalized recommendations.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Node.js", "Telegram API", "OpenAI", "MongoDB"],
    liveUrl: "https://t.me/elvisaibot",
    repoUrl: "https://github.com/enyasystem/telegram-ai-bot",
    featured: false,
  },
    {
      id: 9,
      title: "RS News NG",
      description:
        "A modern Nigerian news platform delivering the latest headlines, in-depth articles, and real-time updates across politics, business, entertainment, and more.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
      liveUrl: "https://rsnewsng.com",
      repoUrl: "https://github.com/enyasystem/rsnewsng",
      featured: false,
    },
]

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden border border-border shadow-sm card-hover"
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 w-full group overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-none">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="bg-white/20 text-white border-none">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-primary to-accent text-white border-none">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild className="rounded-full">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild className="rounded-full">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
          </div>

          {project.featured && project.caseStudy && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="rounded-full">
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription>Case Study</DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Project Goal</h4>
                      <p>{project.caseStudy.goal}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.caseStudy.challenges.map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Solutions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.caseStudy.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-2">Outcomes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.caseStudy.outcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-primary/10 to-accent/10 p-3 rounded-lg text-center"
                          >
                            {outcome}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="rounded-full" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Live
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full" asChild>
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const [filter, setFilter] = useState("all")

  // Get unique technologies from all projects
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies)))

  // Filter projects based on selected technology
  const filteredProjects =
    filter === "all" ? projects : projects.filter((project) => project.technologies.includes(filter))

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animated-bg opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading gradient-text">My Projects</h2>
          <p className="section-subheading">
            A showcase of my recent work, personal projects, and contributions to the development community.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex flex-wrap gap-2 justify-center glass-effect p-2 rounded-full">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All Projects
            </Button>

            {allTechnologies.map((tech, index) => (
              <Button
                key={index}
                variant={filter === tech ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(tech)}
                className="rounded-full"
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
