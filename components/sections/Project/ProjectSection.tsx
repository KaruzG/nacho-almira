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
      { src: "https://picsum.photos/seed/still1/1200/675", alt: "Wide shot of the performance", orientation: "horizontal" },
      { src: "https://picsum.photos/seed/still2/600/600", alt: "Close up portrait", orientation: "square" },
      { src: "https://picsum.photos/seed/still3/600/600", alt: "Detail shot", orientation: "square" },
      { src: "https://picsum.photos/seed/still4/600/600", alt: "Behind the scenes", orientation: "square" },
      { src: "https://picsum.photos/seed/still5/1200/675", alt: "Cinematic wide angle", orientation: "horizontal" },
      { src: "https://picsum.photos/seed/still6/600/600", alt: "Silhouette shot", orientation: "square" },
    ],
  };

  return (
    <section className="w-full pt-12 pb-32 px-4 md:px-8 flex flex-col items-center bg-primary-light">
      <div className="container">
        <ProjectsTags tag={`${projectMock.type} / ${projectMock.tag}`} />
        <Title className="uppercase mb-10">{projectMock.title}</Title>
        <HeroVideo />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 md:mt-16">
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

