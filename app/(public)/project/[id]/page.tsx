import { notFound } from "next/navigation";
import { getPublishedProjectById } from "@/lib/projects";
import ProjectSection from "@/components/sections/Project/ProjectSection";

export const revalidate = 0; // Fetch fresh data on request

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = await getPublishedProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectSection project={project} />;
}
