import { z } from "zod";
import { isHttpUrl, mediaSchema, presentationSchema } from "@/lib/media";
import { getYouTubeId } from "@/lib/youtube";
import { InputError, verifyMedia } from "@/lib/mediaServer";
import type { MediaItem, VideoPresentation } from "@/lib/media";

const schema = z.object({
  title: z.string().trim().min(1), type: z.enum(["Personal", "Ad-Film"]),
  category: z.string().regex(/^[a-f\d]{24}$/i), year: z.number().int(),
  videoLink: z.string(), videoPresentation: presentationSchema.nullish(),
  trailerLink: z.string().default(""), description: z.string().default(""),
  media: z.array(mediaSchema), credits: z.array(z.object({ role: z.string(), name: z.string() })),
  mediaLink: z.string().default(""), visibility: z.enum(["draft", "published"]),
});

export async function validateProject(body: unknown, previous?: {
  videoLink: string; videoPresentation?: VideoPresentation; media: MediaItem[]; trailerLink?: string;
}) {
  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new InputError("Invalid project fields or media metadata.");
  const data = parsed.data;
  if (!getYouTubeId(data.videoLink) &&
    !(data.videoLink === previous?.videoLink && isHttpUrl(data.videoLink))) {
    throw new InputError("The main video must be a valid YouTube URL.");
  }
  if (data.videoPresentation && data.videoPresentation.videoLink !== data.videoLink) {
    data.videoPresentation = null;
  }
  if (data.videoPresentation === undefined && previous?.videoLink === data.videoLink) {
    data.videoPresentation = previous.videoPresentation;
  }
  if (previous?.videoLink !== data.videoLink && !data.videoPresentation) data.videoPresentation = null;
  if (data.trailerLink && data.trailerLink !== previous?.trailerLink) {
    let url: URL;
    try { url = new URL(data.trailerLink); } catch { throw new InputError("Upload a valid MP4 trailer."); }
    const match = url.pathname.match(/\/video\/upload\/(?:v\d+\/)?(nacho-almira\/projects\/.+)\.mp4$/);
    if (url.hostname !== "res.cloudinary.com" || !match) throw new InputError("Upload the trailer using the MP4 selector.");
    await verifyMedia([{ src: data.trailerLink, alt: "", publicId: match[1], kind: "video" }]);
  }
  data.media = await verifyMedia(data.media, previous?.media);
  return data;
}
