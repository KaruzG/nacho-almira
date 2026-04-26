"use client";

import { useState } from "react";
import Title from "@/components/ui/Title";
import ProjectsGrid, { Project } from "./ProjectsGrid";

import ProjectsFilter, { FilterType } from "./ProjectsFilter";

const projectsMock: Project[] = [
  {
    id: 1,
    title: "caos - locked in",
    tag: "Personal / video clip",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4",
    type: "Personal"
  },
  {
    id: 2,
    title: "Project Beta",
    tag: "Art Direction",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4",
    type: "Commissioned"
  },
  {
    id: 3,
    title: "Project Gamma",
    tag: "3D Animation",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4",
    type: "Personal"
  },
  {
    id: 4,
    title: "Project Delta",
    tag: "Web Experience",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4",
    type: "Commissioned"
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All projects");

  const filteredProjects = projectsMock.filter(project => {
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

