import Title from "@/components/ui/Title";
import { Project } from "../Projects/ProjectsGrid";
import ProjectsTags from "../Projects/ProjectsTags";
import HeroVideo from "../Hero/HeroVideo";
import ProjectDescription from "./ProjectDescription";
import ProjectCredits from "./ProjectCredits";
import ProjectStills from "./ProjectStills";

const ProjectSection = () => {
  const projectMock: Project = {
    id: 1,
    title: "caos - locked in",
    tag: "video clip",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4",
    type: "Personal",
    shortDescription: "A visual journey through rhythm and chaos.",
    description: "Locked In is a personal video clip project that explores the tension between control and release. Combining dynamic camera movements with striking color grading, the piece captures an artist's raw performance in a confined space, creating an immersive experience that pulls the viewer into the music.",
    mediaLink: "https://www.youtube.com/watch?v=example",
    credits: [
      { role: "Director", name: "Nacho Almira" },
      { role: "Editor", name: "Nacho Almira" },
      { role: "Cinematographer", name: "Carlos Ruiz" },
      { role: "Color Grading", name: "María López" },
      { role: "Artist", name: "Caos" },
    ],
    stills: [
      { src: "https://res.cloudinary.com/dmfyvtezz/image/upload/v1777412194/Large_Feature_Still_xv0tae.png", alt: "Wide shot of the performance"},
      { src: "https://res.cloudinary.com/dmfyvtezz/image/upload/v1777412194/Balanced_Bottom_Row_pnm6g6.png", alt: "Close up portrait" },
      { src: "https://res.cloudinary.com/dmfyvtezz/image/upload/v1777412194/Background_gaypta.png", alt: "Detail shot" },
      { src: "https://res.cloudinary.com/dmfyvtezz/image/upload/v1777412194/AB6AXU_1_b8mrj6.png", alt: "Behind the scenes" },
      { src: "https://res.cloudinary.com/dmfyvtezz/image/upload/v1777412194/Background-1_bcvk08.png", alt: "Cinematic wide angle" },
    ],
  };

  return (
    <section className="w-full pt-12 pb-32 px-4 md:px-8 flex flex-col items-center bg-primary-light">
      <div className="container">
        <ProjectsTags tag={`${projectMock.type} / ${projectMock.tag}`} />
        <Title className="uppercase mb-10 mt-3">{projectMock.title}</Title>
        <HeroVideo />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mt-12 md:mt-16">
          <div className="md:col-span-2">
            <ProjectDescription
              shortDescription={projectMock.shortDescription!}
              description={projectMock.description!}
              mediaLink={projectMock.mediaLink}
            />
          </div>
          <div className="md:col-span-1">
            <ProjectCredits credits={projectMock.credits!} />
          </div>
        </div>

        <ProjectStills stills={projectMock.stills!} />
      </div>
    </section>
  )
};

export default ProjectSection;

