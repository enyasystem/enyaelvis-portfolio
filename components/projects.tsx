"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjectImage } from "@/lib/utils/projects"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, ExternalLink, Maximize2 } from "lucide-react"

interface CaseStudy {
  goal: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  screenshots?: string[];
  demoVideo?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  screenshots?: string[];
  demoVideo?: string;
}

// Project card component

// Sample project data
const projects = [
  {
    id: 1,
    title: "Booster Base NG",
    description:
      "A corporate website for an IT training and services company offering professional development programs.",
    image: "/projects/boosterbase.jpg",
    technologies: [ "JavaScript", "CSS", "Supabase", "Responsive Design"],
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
      screenshots: [
        "/projects/boosterbase-1.jpg",
        "/projects/boosterbase-2.jpg",
        "/projects/boosterbase-mobile.jpg"
      ],
      demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
  },
  {
    id: 2,
    title: "Access Capital MIC",
    description:
      "A professional website for a mortgage investment company with secure, high-yield investment opportunities.",
    image: "/projects/accessCapital.png",
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
    image: "/projects/iec-services.jpg",
    technologies: [ "JavaScript", "Responsive Design", "SEO"],
    liveUrl: "https://iecservices.org",
    repoUrl: "https://github.com/enyasystem/iecservices",
    featured: true,
  },
  {
    id: 4,
    title: "Milton High School",
    description:
      "An educational website for a Canadian curriculum school, providing information for students, parents, and prospective families.",
    image: "/projects/milton-high-school.jpg",
    technologies: ["WordPress", "Custom PHP", "CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://miltonhighschool.ng",
    repoUrl: "https://github.com/enyasystem/miltonhighschool",
    featured: false,
  },
  {
    id: 5,
    title: "Boxed Water NG",
    description: "An e-commerce platform for a bottled water company, featuring online ordering and delivery services.",
    image: "/projects/boxed-water.jpg",
    technologies: ["WooCommerce", "WordPress", "PHP", "JavaScript", "Payment Integration"],
    liveUrl: "https://boxedwater.ng",
    repoUrl: "https://github.com/enyasystem/boxedwater",
    featured: false,
  },
  {
    id: 6,
    title: "Jeason Steel",
    description:
      "A corporate website for a steel manufacturing company, showcasing products, services, and industry expertise.",
    image: "/projects/jeason-steel.jpg",
    technologies: ["React", "Node.js", "TypeScript ", "Supabase", "Material UI"],
    liveUrl: "https://jeasonsteel.com",
    repoUrl: "https://github.com/enyasystem/jeasonsteel",
    featured: true,
  },
  {
    id: 7,
    title: "GG Clean Experts",
    description: "A professional cleaning service website offering residential and commercial cleaning solutions.",
    image: "/projects/gg-clean-experts.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "https://ggcleanexperts.com",
    repoUrl: "https://github.com/enyasystem/ggcleanexperts",
    featured: true,
  },
  {
    id: 8,
    title: "Endvre",
    description:
      "A luxury e-commerce platform featuring high-end watches and fashion accessories.",
    image: "/projects/endvre.jpg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    liveUrl: "https://endvre.com",
    repoUrl: "https://github.com/enyasystem/endvre",
    featured: false,
  },
  {
    id: 9,
    title: "RS News NG",
    description:
      "A modern Nigerian news platform delivering the latest headlines and in-depth articles.",
    image: "/projects/rs-news.jpg",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "https://rsnewsng.com",
    repoUrl: "https://github.com/enyasystem/rsnewsng",
    featured: true,
  },
  {
    id: 10,
    title: "MJAY 2025",
    description:
      "A modern RSVP website for MJAY 2025, a Nigerian couple planning their wedding.",
    image: "/projects/mjay2025.jpg",
    technologies: ["JavaScript", "Node.js", "NeonDB", "Responsive Design"],
    liveUrl: "http://mjay2025.com",
    repoUrl: "",
    featured: false,
  },
  {
    id: 11,
    title: "Adikaze Waste Recycling",
    description:
      "Corporate site for Adikaze Waste Recycling, focused on environmental sustainability and recycling services.",
    image: "/projects/adikaze-waste-recycling.jpg",
    technologies: ["JavaScript", "Node.js", "NEONDB", "Responsive Design"],
    liveUrl: "https://www.adikazewasterecycling.com",
    repoUrl: "",
    featured: true,
  },
  {
    id: 12,
    title: "Lynphyl Oil & Gas",
    description:
      "Professional website for Lynphyl Oil & Gas, highlighting energy solutions and industry expertise.",
    image: "/projects/lynphyl-oil-gas.jpg",
    technologies: ["Nodejs", "Typescript", "JavaScript", "Responsive Design"],
    liveUrl: "https://www.lynphyloilandgas.com",
    repoUrl: "",
    featured: true,
  },
] satisfies Project[];

// Project card component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden border border-border shadow-sm card-hover"
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 w-full group overflow-hidden">
        <Image
          src={getProjectImage(project.liveUrl).local}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={project.featured}
          onError={(e) => {
            // Try the screenshot service if local image fails
            const target = e.target as HTMLImageElement;
            const images = getProjectImage(project.liveUrl);
            target.src = images.fallback;
            
            // Set up one more fallback to placeholder
            target.onerror = () => {
              target.src = images.placeholder;
              target.onerror = null; // Prevent infinite loop
            };
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.slice(0, 3).map((tech: string, index: number) => (
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
            {/* <Button size="sm" variant="outline" asChild className="rounded-full">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button> */}
            <Button size="sm" variant="outline" asChild className="rounded-full">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                View
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
                  {/* Gallery Section */}
                  {project.caseStudy.screenshots && project.caseStudy.screenshots.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Screenshots & Views</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {project.caseStudy.screenshots.map((src, idx) => (
                          <div key={idx} className="relative h-48 w-full rounded-lg overflow-hidden border border-border">
                            <Image
                              src={src}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Demo Video Section */}
                  {project.caseStudy.demoVideo && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Demo Video</h4>
                      <div className="aspect-video rounded-lg overflow-hidden border border-border">
                        <iframe
                          src={project.caseStudy.demoVideo}
                          title={`${project.title} demo video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Project Goal</h4>
                      <p>{project.caseStudy.goal}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.caseStudy.challenges.map((challenge: string, index: number) => (
                            <li key={index}>{challenge}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Solutions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.caseStudy.solutions.map((solution: string, index: number) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-2">Outcomes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.caseStudy.outcomes.map((outcome: string, index: number) => (
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
                        {project.technologies.map((tech: string, index: number) => (
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
                        {/* <Button size="sm" variant="outline" className="rounded-full" asChild>
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            View Code
                          </a>
                        </Button> */}
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
  );
};
const featuredProjects: Project[] = projects.filter(p => p.featured)

const allProjects: Project[] = projects;

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects)

  useEffect(() => {
    setFilteredProjects(filter === "all" ? allProjects : featuredProjects)
  }, [filter])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore my recent projects and creative works. Each project demonstrates my expertise in
            different technologies and problem-solving abilities.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All Projects
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
              className="rounded-full"
            >
              Featured
              <Badge variant="secondary" className="ml-2 -mr-2">
                {featuredProjects.length}
              </Badge>
            </Button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
