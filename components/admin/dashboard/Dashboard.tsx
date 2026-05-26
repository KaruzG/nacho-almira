"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import ProjectForm from "@/components/admin/dashboard/ProjectForm";
import ProjectList from "@/components/admin/dashboard/ProjectList";
import { CategoryOption, ProjectData } from "@/types/admin";

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchProjects(), fetchCategories()]);
      setLoading(false);
    };
    init();
  }, [fetchProjects, fetchCategories]);

  const handleProjectSaved = () => {
    setEditingProject(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div>
      <DashboardHeader totalEntries={projects.length} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <ProjectForm
          categories={categories}
          editingProject={editingProject}
          onSaved={handleProjectSaved}
          onCancel={() => setEditingProject(null)}
        />

        <ProjectList
          projects={projects}
          loading={loading}
          onEdit={setEditingProject}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
