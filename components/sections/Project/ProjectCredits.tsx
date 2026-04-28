import { ProjectCredit } from "../Projects/ProjectsGrid";

interface ProjectCreditsProps {
  credits: ProjectCredit[];
}

export default function ProjectCredits({ credits }: ProjectCreditsProps) {
  const roleStyles = "text-xs uppercase tracking-[0.15em] text-secondary-dark mb-1";
  const nameStyles = "text-sm font-semibold text-secondary";

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-2">
        Project Credits
      </h3>
      {credits.map((credit, index) => (
        <div key={index} className="flex flex-col">
          <span className={roleStyles}>{credit.role}</span>
          <span className={nameStyles}>{credit.name}</span>
        </div>
      ))}
    </div>
  );
}
