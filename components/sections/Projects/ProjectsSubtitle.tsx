interface ProjectsSubtitleProps {
  title: string;
  tag: string;
}

export default function ProjectsSubtitle({ title, tag }: ProjectsSubtitleProps) {
  return (
    <div className="flex flex-col px-2">
      <h3 className="uppercase text-2xl md:text-2xl font-bold text-primary dark:text-secondary transition-colors duration-300">
        {title}
      </h3>
      <span className="text-sm md:text-base text-[#8F721E] uppercase tracking-[0.15em]">
        {tag}
      </span>
    </div>
  );
}
