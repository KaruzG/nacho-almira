import React from "react";
import Title from "@/components/ui/Title";
import ProjectsGrid, { Project } from "./ProjectsGrid";

const projectsMock: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    tag: "Design & Development",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 2,
    title: "Project Beta",
    tag: "Art Direction",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 3,
    title: "Project Gamma",
    tag: "3D Animation",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 4,
    title: "Project Delta",
    tag: "Web Experience",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="w-full py-24 px-4 md:px-8 flex flex-col items-center bg-primary-light ">
      <div className="w-full max-w-[1400px]">
        <Title className="mb-12">PROJECTS</Title>
        <ProjectsGrid projects={projectsMock} />
      </div>
    </section>
  );
};

export default Projects;

