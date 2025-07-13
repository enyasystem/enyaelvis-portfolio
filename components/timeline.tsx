"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react"

const timelineItems = [
  {
    id: 1,
    title: "BSc Computer Science",
    organization: "University of Cross River",
    period: "2017 - 2022",
    description:
      "Completed a Bachelor of Science in Computer Science with a focus on software development and artificial intelligence.",
    type: "education",
    achievements: [
      "Graduated with Second Class Honors",
      "Final year project on AI-powered content recommendation systems",
      "Member of the university coding club",
    ],
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    organization: "Booster Base NIG LTD",
    period: "2025 - Present",
    description:
      "Working as a full-stack developer, building web applications and implementing AI solutions for various clients.",
    type: "work",
    achievements: [
      "Led the development of 5+ client projects",
      "Implemented CI/CD pipelines that reduced deployment time by 40%",
      "Mentored junior developers and interns",
    ],
  },
  {
    id: 3,
    title: "NYSC Internship",
    organization: "Booster Base NIG LTD",
    period: "2025 - Present",
    description:
      "Completed National Youth Service Corps internship, working on web development projects and learning industry best practices.",
    type: "work",
    achievements: [
      "Developed a customer management system",
      "Contributed to the company's internal tools",
      "Received recognition for outstanding performance",
    ],
  },
  {
    id: 4,
    title: "National Certificate in Education (NCE)",
    organization: "Federal College of Education",
    period: "2012 - 2014",
    description: "Obtained a National Certificate in Education with a focus on computer science and mathematics.",
    type: "education",
    achievements: [
      "Graduated with distinction",
      "Participated in educational technology workshops",
      "Developed teaching materials for computer literacy",
    ],
  },
  {
    id: 5,
    title: "ALX AI Aice Certification",
    organization: "ALX Africa",
    period: "2024",
    description:
      "Completed an intensive AI program covering machine learning, natural language processing, and AI application development.",
    type: "certification",
    achievements: [
      "Completed 1,500+ hours of coursework",
      "Built 20+ AI-powered projects from scratch",
      "Collaborated with international peers on team projects",
    ],
  },
]

const TimelineItem = ({ item, index }: { item: (typeof timelineItems)[0]; index: number }) => {
  const isEven = index % 2 === 0

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-6 w-6" />
      case "education":
        return <GraduationCap className="h-6 w-6" />
      case "certification":
        return <Award className="h-6 w-6" />
      default:
        return <Calendar className="h-6 w-6" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      case "education":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      case "certification":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className={`flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""}`}>
      <div className="md:w-1/2"></div>

      <div className="flex justify-center md:w-0">
        <div className="relative flex items-center justify-center">
          <div className="h-full w-1 bg-border"></div>
          <div
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center z-10 ${getIconColor(item.type)}`}
          >
            {getIcon(item.type)}
          </div>
        </div>
      </div>

      <motion.div
        className="md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div
          className={`mx-2 md:mx-8 p-6 bg-card rounded-lg border border-border shadow-sm ${isEven ? "md:text-right" : ""} card-hover`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <span className="text-sm text-muted-foreground">{item.period}</span>
          </div>
          <p className="text-primary font-medium mb-3">{item.organization}</p>
          <p className="text-muted-foreground mb-4">{item.description}</p>

          <div className="mt-4">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Key Achievements</h4>
            <ul className={`space-y-1 ${isEven ? "md:ml-auto" : ""}`}>
              {item.achievements.map((achievement, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Timeline = () => {
  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Professional Journey</h2>
          <p className="section-subheading">
            A chronological overview of my education, work experience, and professional development.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block"></div>

          <div className="space-y-0">
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
