import Image from "next/image";
import { ProjectStill } from "../Projects/ProjectsGrid";

interface ProjectStillsProps {
  stills: ProjectStill[];
}

export default function ProjectStills({ stills }: ProjectStillsProps) {
  const containerStyles = "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4";
  const imageBaseStyles = "w-full h-full object-cover";

  return (
    <div className="mt-16 md:mt-24">
      <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-dark mb-8">
        Film Stills
      </h3>
      <div className={containerStyles}>
        {stills.map((still, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${
              still.orientation === "horizontal"
                ? "md:col-span-2 aspect-video"
                : "aspect-square"
            }`}
          >
            <Image
              src={still.src}
              alt={still.alt}
              fill
              sizes={
                still.orientation === "horizontal"
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className={imageBaseStyles}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
