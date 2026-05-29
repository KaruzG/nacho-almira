import { getPublishedProjects } from "@/lib/projects";
import Projects from "@/components/sections/Projects/Projects";

export const revalidate = 0; // Fresh fetch each request

export default async function ProjectsPage() {
  const initialProjects = await getPublishedProjects();

  return (
    <main>
      <Projects initialProjects={initialProjects} />
    </main>
  );
}
