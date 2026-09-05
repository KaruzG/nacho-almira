import { z } from "zod";

export const MAX_MEDIA_BYTES = 4_000_000;
export const MEDIA_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,video/mp4";
export const mediaSchema = z.object({
  src: z.url(),
  alt: z.string().default(""),
  publicId: z.string().optional(),
  kind: z.enum(["image", "video"]).optional(),
  format: z.enum(["jpg", "jpeg", "png", "webp", "gif", "mp4"]).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  bytes: z.number().int().positive().max(MAX_MEDIA_BYTES).optional(),
  duration: z.number().positive().optional(),
  codec: z.string().optional(),
});
export type MediaItem = z.infer<typeof mediaSchema>;
export const presentationSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  source: z.literal("admin"),
  videoLink: z.string(),
});
export type VideoPresentation = z.infer<typeof presentationSchema>;

export function isHttpUrl(value?: string): boolean {
  if (!value) return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function validateFile(file: Pick<File, "size" | "type">, videoOnly = false) {
  if (!file.size || file.size > MAX_MEDIA_BYTES) throw new Error("Files must be between 1 and 4,000,000 bytes.");
  if (!(videoOnly ? ["video/mp4"] : MEDIA_ACCEPT.split(",")).includes(file.type)) {
    throw new Error("Use JPEG, PNG, WebP, GIF or MP4 (H.264 with AAC audio).");
  }
}

export function isAnimatedImage(item: MediaItem) {
  return item.format === "gif" || /\.(gif)(?:[?#]|$)/i.test(item.src);
}

export function staticPoster(items: MediaItem[] = []) {
  return items.find(item => item.kind !== "video" && !isAnimatedImage(item) &&
    !/\.(mp4|webm)(?:[?#]|$)/i.test(item.src))?.src;
}
