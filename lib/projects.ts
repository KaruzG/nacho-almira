import dbConnect from "@/lib/db/mongoose";
import ProjectModel from "@/lib/models/Project";
import "@/lib/models/Category"; // Ensure Category schema is registered
import { Project } from "@/components/sections/Projects/ProjectsGrid";

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
      trailerUrl: proj.trailerLink || "",
      type: proj.type || "Personal",
      description: proj.description || "",
      mediaLink: proj.mediaLink || "",
      credits: proj.credits
        ? proj.credits.map((c: {role: string, name: string}) => ({ role: c.role, name: c.name }))
        : [],
      stills: proj.media
        ? proj.media.map((m: {src: string, alt: string}) => ({ src: m.src, alt: m.alt }))
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
      trailerUrl: proj.trailerLink || "",
      type: proj.type || "Personal",
      description: proj.description || "",
      mediaLink: proj.mediaLink || "",
      credits: proj.credits
        ? proj.credits.map((c: {role: string, name: string}) => ({ role: c.role, name: c.name }))
        : [],
      stills: proj.media
        ? proj.media.map((m: {src: string, alt: string}) => ({ src: m.src, alt: m.alt }))
        : [],
    };
  } catch (error) {
    return null;
  }
}
