import Title from "@/components/ui/Title";
import { Project } from "../Projects/ProjectsGrid";
import ProjectsTags from "../Projects/ProjectsTags";
import HeroVideo from "../Hero/HeroVideo";
import ProjectDescription from "./ProjectDescription";
import ProjectCredits from "./ProjectCredits";
import ProjectStills from "./ProjectStills";

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  return (
    <section className="w-full pt-12 pb-32 px-4 md:px-8 flex flex-col items-center bg-primary-light">
      <div className="container">
        <ProjectsTags tag={`${project.type} / ${project.tag}`} />
        <Title className="uppercase mb-10 mt-3">{project.title}</Title>
        <HeroVideo videoUrl={project.videoUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mt-12 md:mt-16">
          <div className="md:col-span-2">
            <ProjectDescription
              shortDescription={project.shortDescription || ""}
              description={project.description || ""}
              mediaLink={project.mediaLink}
            />
          </div>
          <div className="md:col-span-1">
            <ProjectCredits credits={project.credits || []} />
          </div>
        </div>

        {project.stills && project.stills.length > 0 && (
          <ProjectStills stills={project.stills} />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;

