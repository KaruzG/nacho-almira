"use client";

import { useState } from "react";
import Title from "@/components/ui/Title";
import ProjectsGrid, { Project } from "./ProjectsGrid";

import ProjectsFilter, { FilterType } from "./ProjectsFilter";

interface ProjectsProps {
  initialProjects: Project[];
}

const Projects = ({ initialProjects }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All projects");

  const filteredProjects = initialProjects.filter(project => {
    if (activeFilter === "All projects") return true;
    return project.type === activeFilter;
  });

  return (
    <section id="projects" className="w-full pt-12 pb-32 px-4 md:px-8 flex flex-col items-center bg-primary-light">
      <div className="w-full max-w-[1400px]">
        <Title className="mb-8">PROJECTS</Title>
        <ProjectsFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <ProjectsGrid projects={filteredProjects} />
      </div>
    </section>
  );
};

export default Projects;

