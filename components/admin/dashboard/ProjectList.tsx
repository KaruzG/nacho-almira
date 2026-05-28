"use client";

import ProjectListItem from "./ProjectListItem";
import { ProjectData } from "@/types/admin";

interface ProjectListProps {
  projects: ProjectData[];
  loading: boolean;
  onEdit: (project: ProjectData) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({ projects, loading, onEdit, onDelete }: ProjectListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-secondary">
          Existing Works
        </h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-primary-light rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-secondary">
        Existing Works
      </h2>

      {projects.length === 0 ? (
        <p className="text-secondary-dark text-sm py-8 text-center">
          No projects yet. Create your first one!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={() => onEdit(project)}
              onDelete={() => onDelete(project._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
