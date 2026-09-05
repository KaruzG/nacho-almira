import type { Project } from "@/components/sections/Projects/ProjectsGrid";
import { getYouTubeAspect, getYouTubeId } from "@/lib/youtube";

export type HomeSettings = { mode: "random" | "fixed"; projectId?: string | null };
export function homeCandidates(projects: Project[]) {
  return projects.filter(project => getYouTubeId(project.videoUrl) &&
    getYouTubeAspect(project.videoPresentation, project.videoUrl));
}
export function selectHome(projects: Project[], settings: HomeSettings, random = Math.random) {
  const candidates = homeCandidates(projects);
  const fixed = settings.mode === "fixed" ? candidates.find(p => String(p.id) === settings.projectId) : undefined;
  return {
    project: fixed || candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))] || null,
    invalidFixed: settings.mode === "fixed" && !fixed,
  };
}
