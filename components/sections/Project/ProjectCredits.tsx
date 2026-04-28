import { ProjectCredit } from "../Projects/ProjectsGrid";

interface ProjectCreditsProps {
  credits: ProjectCredit[];
}

export default function ProjectCredits({ credits }: ProjectCreditsProps) {
  const roleStyles = "text-sm uppercase tracking-[0.15em] text-secondary-dark mb-1";
  const nameStyles = "text-md font-semibold text-secondary";
  const titleStyles = "text-lg font-bold uppercase tracking-wider text-secondary pb-3 border-b border-secondary/20"

  return (
    <div className="flex flex-col gap-5">
      <h3 className={titleStyles}>
        Project Credits
      </h3>
      {credits.map((credit, index) => (
        <div key={index} className="flex flex-row justify-between uppercase">
          <span className={roleStyles}>{credit.role}</span>
          <span className={nameStyles}>{credit.name}</span>
        </div>
      ))}
    </div>
  );
}
