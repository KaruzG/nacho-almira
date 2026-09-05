import dbConnect from "@/lib/db/mongoose";
import ProjectModel from "@/lib/models/Project";
import "@/lib/models/Category"; // Ensure Category schema is registered
import { Project } from "@/components/sections/Projects/ProjectsGrid";
import type { MediaItem } from "@/lib/media";

function mapMedia(m: MediaItem): MediaItem {
  return { src: m.src, alt: m.alt || "", publicId: m.publicId, kind: m.kind,
    format: m.format, width: m.width, height: m.height, bytes: m.bytes, duration: m.duration, codec: m.codec };
}

/**
 * Fetch all published projects, mapped to the public Project interface.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  await dbConnect();

  const dbProjects = await ProjectModel.find({ visibility: "published" })
    .populate("category")
    .sort({ createdAt: -1 })
    .lean();

  return dbProjects.map((proj) => {
    const categoryName =
      proj.category && (proj.category).name
        ? (proj.category).name
        : "";

    return {
      id: proj._id.toString(),
      title: proj.title,
      tag: categoryName,
      videoUrl: proj.videoLink,
      videoPresentation: proj.videoPresentation ? {
        width: proj.videoPresentation.width, height: proj.videoPresentation.height,
        source: proj.videoPresentation.source, videoLink: proj.videoPresentation.videoLink,
      } : undefined,
      trailerUrl: proj.trailerLink || "",
      type: proj.type || "Personal",
      description: proj.description || "",
      mediaLink: proj.mediaLink || "",
      credits: proj.credits
        ? proj.credits.map((c: {role: string, name: string}) => ({ role: c.role, name: c.name }))
        : [],
      stills: proj.media
        ? proj.media.map(mapMedia)
        : [],
    };
  });
}

/**
 * Fetch a single published project by its ID, mapped to the public Project interface.
 */
export async function getPublishedProjectById(id: string): Promise<Project | null> {
  await dbConnect();

  try {
    const proj = await ProjectModel.findOne({
      _id: id,
      visibility: "published",
    }).populate("category");

    if (!proj) return null;

    const categoryName =
      proj.category && (proj.category).name
        ? (proj.category).name
        : "";

    return {
      id: proj._id.toString(),
      title: proj.title,
      tag: categoryName,
      videoUrl: proj.videoLink,
      videoPresentation: proj.videoPresentation ? {
        width: proj.videoPresentation.width, height: proj.videoPresentation.height,
        source: proj.videoPresentation.source, videoLink: proj.videoPresentation.videoLink,
      } : undefined,
      trailerUrl: proj.trailerLink || "",
      type: proj.type || "Personal",
      description: proj.description || "",
      mediaLink: proj.mediaLink || "",
      credits: proj.credits
        ? proj.credits.map((c: {role: string, name: string}) => ({ role: c.role, name: c.name }))
        : [],
      stills: proj.media
        ? proj.media.map(mapMedia)
        : [],
    };
  } catch (error) {
    return null;
  }
}
