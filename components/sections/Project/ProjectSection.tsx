import Title from "@/components/ui/Title";
import { Project } from "../Projects/ProjectsGrid";
import ProjectsTags from "../Projects/ProjectsTags";
import HeroVideo from "../Hero/HeroVideo";
import ProjectDescription from "./ProjectDescription";
import ProjectCredits from "./ProjectCredits";
import ProjectStills from "./ProjectStills";
import { getYouTubeAspect } from "@/lib/youtube";
import "./project-layout.css";

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  return (
    <section className="w-full pt-12 pb-32 px-4 md:px-8 flex flex-col items-center bg-primary-light">
      <div className="container">
        <div className="project-layout">
          <div className="project-heading">
            <ProjectsTags tag={`${project.type} / ${project.tag}`} />
            <Title className="uppercase mb-6 mt-3">{project.title}</Title>
          </div>
          <div className="project-player min-w-0">
            <HeroVideo videoUrl={project.videoUrl} videoAspect={getYouTubeAspect(project.videoPresentation, project.videoUrl)} />
          </div>
          <div className="project-description">
            <ProjectDescription
              shortDescription={project.shortDescription || ""}
              description={project.description || ""}
            />
          </div>
          <aside className="project-sidebar min-w-0">
            {project.mediaLink && <a className="project-media-link text-accent underline self-start" href={project.mediaLink} target="_blank" rel="noopener noreferrer">Link to media ↗</a>}
            <div className="project-credits min-w-0">
              <ProjectCredits credits={project.credits || []} />
            </div>
          </aside>
        </div>

        {project.stills && project.stills.length > 0 && (
          <ProjectStills stills={project.stills} />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
