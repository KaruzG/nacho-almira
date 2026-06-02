"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import ProjectsTrailer from "./ProjectsTrailer";
import ProjectsSubtitle from "./ProjectsSubtitle";
import ProjectSkeleton from "./ProjectSkeleton";
import Link from "next/link";
import { FilterType } from "./ProjectsFilter";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectStill {
  src: string;
  alt: string;
}

export interface Project {
  id: string | number;
  title: string;
  tag: string;
  videoUrl: string;
  trailerUrl?: string;
  type?: FilterType | string;
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
          <Link href={`/project/${project.id}`}>
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
              <ProjectsTrailer 
                trailerUrl={project.trailerUrl} 
                fallbackImage={project.stills && project.stills.length > 0 ? project.stills[0].src : undefined}
                title={project.title}
              />
              <ProjectsSubtitle title={project.title} tag={`${project.type} / ${project.tag}`} />
            </motion.div>
          </Link>
        </Suspense>
      ))}
    </div>
  );
}
