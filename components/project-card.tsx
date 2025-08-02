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

// Project card component
export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden border border-border shadow-sm card-hover"
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 w-full group overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={project.featured}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
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
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
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
