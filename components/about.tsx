"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileDown, Github, Linkedin, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface GitHubData {
  avatar_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

const About = () => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/enyasystem")
        const data = await response.json()
        setGithubData(data)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animated-bg opacity-80"></div>

      {/* Particles */}
      <div className="absolute inset-0 -z-5 particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Tabs defaultValue="about" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="glass-effect">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="github">GitHub Activity</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="mt-0">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                className="w-full md:w-2/5 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col justify-center h-full">
                  <div className="relative w-[120px] h-[160px] md:w-[140px] md:h-[180px] rounded-lg overflow-hidden shadow-lg neon-border mb-4 mx-auto">
                    <Image
                      src="/myLogo.png?height=180&width=140"
                      alt="Elvis - Professional Photo"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                  </div>
                  <div className="bg-gradient-to-r from-primary to-accent text-white p-3 rounded-lg shadow-lg w-fit text-center mx-auto">
                    <p className="font-bold">Currently at</p>
                    <p>Booster Base NIG LTD</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-3/5 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="section-heading gradient-text">About Me</h2>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-8 text-foreground/90">
                  <p>
                    I'm a passionate full-stack developer with expertise in building modern web applications and
                    AI-powered solutions. Currently working at Booster Base NIG LTD, I specialize in creating intuitive
                    user interfaces and robust backend systems.
                  </p>
                  <p>
                    With a background in Computer Science and a keen interest in emerging technologies, I approach each
                    project with a focus on clean code, performance optimization, and exceptional user experience. My
                    development philosophy centers around creating scalable solutions that solve real business problems.
                  </p>
                  <p>
                    When I'm not coding, I enjoy contributing to open-source projects and sharing my knowledge through
                    my technical blog, Complete24Vibes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
                  >
                    <a href="/resume.pdf" download>
                      <span className="relative z-10 flex items-center">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Resume
                      </span>
                    </a>
                  </Button>

                  <Button variant="outline" asChild className="group border-primary/50 hover:border-primary">
                    <a href="https://github.com/enyasystem" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                      GitHub
                    </a>
                  </Button>

                  <Button variant="outline" asChild className="group border-primary/50 hover:border-primary">
                    <a href="https://www.linkedin.com/in/enyaelvis/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="github" className="mt-0">
            <div className="bg-card rounded-lg p-6 border border-border shadow-lg glass-effect">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  {loading ? (
                    <div className="animate-pulse w-32 h-32 rounded-full bg-muted"></div>
                  ) : (
                    githubData && (
                      <>
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 mb-4">
                          <Image
                            src={githubData.avatar_url || "/placeholder.svg"}
                            alt={githubData.name || "GitHub Profile"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{githubData.name}</h3>
                        <p className="text-muted-foreground text-center mb-4">{githubData.bio}</p>
                        <div className="flex gap-4 text-sm">
                          <div className="text-center">
                            <p className="font-bold text-primary">{githubData.public_repos}</p>
                            <p className="text-muted-foreground">Repos</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-primary">{githubData.followers}</p>
                            <p className="text-muted-foreground">Followers</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-primary">{githubData.following}</p>
                            <p className="text-muted-foreground">Following</p>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>

                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">GitHub Contributions</h3>
                  <div className="bg-card border border-border rounded-lg p-4 overflow-hidden">
                    <iframe
                      src={`https://github-readme-stats.vercel.app/api?username=enyasystem&show_icons=true&theme=radical&hide_border=true&count_private=true`}
                      width="100%"
                      height="200px"
                      frameBorder="0"
                      title="GitHub Stats"
                      className="w-full"
                    ></iframe>
                  </div>

                  <div className="mt-4 bg-card border border-border rounded-lg p-4 overflow-hidden">
                    <iframe
                      src={`https://ghchart.rshah.org/enyasystem`}
                      width="100%"
                      height="100px"
                      frameBorder="0"
                      title="GitHub Contribution Graph"
                      className="w-full"
                    ></iframe>
                  </div>

                  <div className="mt-4">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500"
                    >
                      <a
                        href="https://github.com/enyasystem"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View GitHub Profile
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interests" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border shadow-lg glass-effect card-3d">
                <div className="card-3d-content">
                  <h3 className="text-xl font-semibold mb-4 gradient-text">Open Source</h3>
                  <p className="text-muted-foreground mb-4">
                    I'm passionate about contributing to open source projects and giving back to the developer
                    community. I believe in the power of collaboration and shared knowledge.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                    <li>Regular contributor to JavaScript libraries</li>
                    <li>Maintain several personal open source projects</li>
                    <li>Participate in Hacktoberfest annually</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border shadow-lg glass-effect card-3d">
                <div className="card-3d-content">
                  <h3 className="text-xl font-semibold mb-4 gradient-text">AI & Machine Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    I'm fascinated by the potential of AI to transform how we build and interact with software. I'm
                    constantly exploring new AI technologies and applications.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                    <li>Building AI-powered chatbots and assistants</li>
                    <li>Exploring natural language processing</li>
                    <li>Implementing machine learning models in web apps</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border shadow-lg glass-effect card-3d">
                <div className="card-3d-content">
                  <h3 className="text-xl font-semibold mb-4 gradient-text">Technical Writing</h3>
                  <p className="text-muted-foreground mb-4">
                    I enjoy sharing my knowledge through writing. I regularly publish articles on web development, AI,
                    and software engineering best practices.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                    <li>Author of Complete24Vibes technical blog</li>
                    <li>Creating comprehensive documentation for projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default About
