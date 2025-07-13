"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Layout, Database, GitBranch, Bot, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

// Import tech icons
const techIcons = {
  JavaScript: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg", color: "#F7DF1E" },
  TypeScript: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg", color: "#3178C6" },
  PHP: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg", color: "#777BB4" },
  Python: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg", color: "#3776AB" },
  HTML5: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg", color: "#E34F26" },
  CSS3: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg", color: "#1572B6" },
  React: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg", color: "#61DAFB" },
  "Next.js": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg", color: "#000000" },
  "Material UI": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/materialui.svg", color: "#0081CB" },
  "Tailwind CSS": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg", color: "#06B6D4" },
  Redux: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redux.svg", color: "#764ABC" },
  "Framer Motion": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framermotion.svg", color: "#0055FF" },
  "Node.js": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg", color: "#339933" },
  Express: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/express.svg", color: "#000000" },
  MySQL: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg", color: "#4479A1" },
  MongoDB: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg", color: "#47A248" },
  Firebase: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg", color: "#FFCA28" },
  "REST API": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postman.svg", color: "#FF6C37" },
  Git: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg", color: "#F05032" },
  "CI/CD": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg", color: "#2088FF" },
  Agile: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg", color: "#0052CC" },
  Docker: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg", color: "#2496ED" },
  Jest: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jest.svg", color: "#C21325" },
  Webpack: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webpack.svg", color: "#8DD6F9" },
  Supabase: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg", color: "#3ECF8E" },
  "Telegram Bots": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/telegram.svg", color: "#26A5E4" },
  "Prompt Engineering": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", color: "#412991" },
  "ChatGPT API": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", color: "#412991" },
  "Discord Bots": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg", color: "#5865F2" },
  "AI Integration": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", color: "#412991" },
  NLP: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/numpy.svg", color: "#013243" },
}

const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "JavaScript", level: "Expert", icon: techIcons.JavaScript },
      { name: "PHP", level: "Proficient", icon: techIcons.PHP },
      { name: "Python", level: "Familiar", icon: techIcons.Python },
      { name: "TypeScript", level: "Proficient", icon: techIcons.TypeScript },
      { name: "HTML5", level: "Expert", icon: techIcons.HTML5 },
      { name: "CSS3", level: "Expert", icon: techIcons.CSS3 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: <Layout className="h-5 w-5" />,
    skills: [
      { name: "React", level: "Expert", icon: techIcons.React },
      { name: "Next.js", level: "Proficient", icon: techIcons["Next.js"] },
      { name: "Material UI", level: "Proficient", icon: techIcons["Material UI"] },
      { name: "Tailwind CSS", level: "Expert", icon: techIcons["Tailwind CSS"] },
      { name: "Redux", level: "Familiar", icon: techIcons.Redux },
      { name: "Framer Motion", level: "Familiar", icon: techIcons["Framer Motion"] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Node.js", level: "Expert", icon: techIcons["Node.js"] },
      { name: "Express", level: "Familiar", icon: techIcons.Express },
      { name: "MySQL", level: "Proficient", icon: techIcons.MySQL },
      { name: "MongoDB", level: "Familiar", icon: techIcons.MongoDB },
      { name: "Supabase", level: "Familiar", icon: techIcons.Supabase },
      { name: "REST API", level: "Familiar", icon: techIcons["REST API"] },
    ],
  },
  {
    id: "tools",
    name: "Tools & Methods",
    icon: <GitBranch className="h-5 w-5" />,
    skills: [
      { name: "Git", level: "Expert", icon: techIcons.Git },
      { name: "CI/CD", level: "Familiar", icon: techIcons["CI/CD"] },
      { name: "Agile", level: "Familiar", icon: techIcons.Agile },
      { name: "Docker", level: "Familiar", icon: techIcons.Docker },
      // { name: "Jest", level: "Proficient", icon: techIcons.Jest },
      // { name: "Webpack", level: "Familiar", icon: techIcons.Webpack },
    ],
  },
  {
    id: "ai",
    name: "AI & Bots",
    icon: <Bot className="h-5 w-5" />,
    skills: [
      { name: "Telegram Bots", level: "Expert", icon: techIcons["Telegram Bots"] },
      { name: "Prompt Engineering", level: "Proficient", icon: techIcons["Prompt Engineering"] },
      { name: "ChatGPT API", level: "Proficient", icon: techIcons["ChatGPT API"] },
      { name: "Discord Bots", level: "Familiar", icon: techIcons["Discord Bots"] },
      { name: "AI Integration", level: "Proficient", icon: techIcons["AI Integration"] },
      { name: "NLP", level: "Familiar", icon: techIcons.NLP },
    ],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600"
    case "Proficient":
      return "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600"
    case "Familiar":
      return "bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500 dark:from-gray-600 dark:to-slate-600"
  }
}

const SkillCard = ({ skill, index }: { skill: { name: string; level: string; icon: string }; index: number }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      className="bg-card rounded-lg p-4 shadow-sm border border-border flex items-center gap-4 card-hover"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
          },
        },
      }}
    >
      <div className="w-10 h-10 relative flex items-center justify-center">
        {skill.icon ? (
          <span className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: skill.icon.color + '22' }}>
            <img
              src={skill.icon.url}
              alt={skill.name}
              width={28}
              height={28}
              style={{ objectFit: "contain", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
            />
          </span>
        ) : (
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Code className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium">{skill.name}</h4>
          <span className={`text-xs px-2 py-1 rounded-full text-white ${getLevelColor(skill.level)}`}>
            {skill.level}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div
            className={`h-1.5 rounded-full ${getLevelColor(skill.level)} skill-bar-fill`}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            style={{
              transformOrigin: "left",
              width: skill.level === "Expert" ? "90%" : skill.level === "Proficient" ? "70%" : "50%",
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages")
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animated-bg opacity-50"></div>

      {/* Particles */}
      <div className="absolute inset-0 -z-5 particles-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-heading gradient-text">Technical Skills</h2>
            <p className="section-subheading">
              A comprehensive overview of my technical expertise and proficiency levels across various technologies and
              domains.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="languages" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1 glass-effect">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          className="mt-16 bg-card rounded-lg p-6 border border-border glass-effect"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">Skills Visualization</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card/50 rounded-lg p-4 border border-border">
                  <h4 className="text-lg font-medium mb-4">Proficiency Distribution</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="rgba(100, 100, 100, 0.2)"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="hsl(var(--primary))"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset="62.8"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="currentColor"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          75%
                        </text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <span className="text-sm">Expert: 45%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                        <span className="text-sm">Proficient: 35%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                        <span className="text-sm">Familiar: 20%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-lg p-4 border border-border">
                  <h4 className="text-lg font-medium mb-4">Technology Focus</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Frontend</span>
                        <span className="text-sm">85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Backend</span>
                        <span className="text-sm">80%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">AI & ML</span>
                        <span className="text-sm">65%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">DevOps</span>
                        <span className="text-sm">60%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
