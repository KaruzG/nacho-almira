import { Suspense } from "react";
import ProjectsTrailer from "./ProjectsTrailer";
import ProjectsSubtitle from "./ProjectsSubtitle";

export interface Project {
  id: string | number;
  title: string;
  tag: string;
  videoUrl: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

import ProjectSkeleton from "./ProjectSkeleton";

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 lg:gap-x-12">
      {projects.map((project) => (
        <Suspense key={project.id} fallback={<ProjectSkeleton />}>
          <div className="flex flex-col group cursor-pointer">
            <ProjectsTrailer videoUrl={project.videoUrl} />
            <ProjectsSubtitle title={project.title} tag={project.tag} />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
