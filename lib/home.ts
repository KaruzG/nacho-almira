import dbConnect from "@/lib/db/mongoose";
import SiteSettings from "@/lib/models/SiteSettings";
import { getPublishedProjects } from "@/lib/projects";
import { homeCandidates, selectHome, type HomeSettings } from "@/lib/homeSelection";

export async function getHomeConfiguration() {
  await dbConnect();
  const [stored, projects] = await Promise.all([SiteSettings.findById("home").lean(), getPublishedProjects()]);
  const settings: HomeSettings = stored
    ? { mode: stored.mode, projectId: stored.projectId?.toString() || null }
    : { mode: "random", projectId: null };
  return { settings, projects: homeCandidates(projects), ...selectHome(projects, settings) };
}
