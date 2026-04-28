"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import ProjectsTrailer from "./ProjectsTrailer";
import ProjectsSubtitle from "./ProjectsSubtitle";
import ProjectSkeleton from "./ProjectSkeleton";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectStill {
  src: string;
  alt: string;
  orientation: "horizontal" | "square";
}

export interface Project {
  id: string | number;
  title: string;
  tag: string;
  videoUrl: string;
  type?: "Personal" | "Commissioned";
  shortDescription?: string;
  description?: string;
  mediaLink?: string;
  credits?: ProjectCredit[];
  stills?: ProjectStill[];
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 lg:gap-x-12">
      {projects.map((project, index) => (
        <Suspense key={project.id} fallback={<ProjectSkeleton />}>
          <motion.div
            className="flex flex-col group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: index * 0.15,
            }}
          >
            <ProjectsTrailer videoUrl={project.videoUrl} />
            <ProjectsSubtitle title={project.title} tag={`${project.type} / ${project.tag}`} />
          </motion.div>
        </Suspense>
      ))}
    </div>
  );
}
