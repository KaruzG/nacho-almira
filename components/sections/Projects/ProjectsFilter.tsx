export type FilterType = "All projects" | "Personal" | "Ad-Film";

interface ProjectsFilterProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

export default function ProjectsFilter({ activeFilter, setActiveFilter }: ProjectsFilterProps) {
  const filterStyles = {
    base: "text-[14px] transition-all duration-200 font-bold tracking-wider uppercase hover:cursor-pointer",
    active: "text-accent underline underline-offset-5 decoration-2",
    inactive: "text-[#8F721E] hover:text-accent"
  };

  const filters: FilterType[] = ["All projects", "Personal", "Ad-Film"];

  return (
    <div className="flex flex-wrap gap-6 mb-12">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`${filterStyles.base} ${
            activeFilter === filter ? filterStyles.active : filterStyles.inactive
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
