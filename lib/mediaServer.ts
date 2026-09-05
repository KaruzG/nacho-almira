import cloudinary from "@/lib/cloudinary";
import { MAX_MEDIA_BYTES, MediaItem } from "@/lib/media";

export class InputError extends Error {}

type Resource = {
  secure_url: string; public_id: string; resource_type: string; format: string;
  width: number; height: number; bytes: number; duration?: number;
  video?: { codec?: string }; audio?: { codec?: string };
};

export function providerMedia(result: Resource): MediaItem {
  const video = result.resource_type === "video";
  if (!["image", "video"].includes(result.resource_type) ||
      !(video ? ["mp4"] : ["jpg", "jpeg", "png", "webp", "gif"]).includes(result.format) ||
      !Number.isInteger(result.bytes) || result.bytes <= 0 || result.bytes > MAX_MEDIA_BYTES ||
      !Number.isInteger(result.width) || result.width <= 0 ||
      !Number.isInteger(result.height) || result.height <= 0 ||
      (video && (result.video?.codec !== "h264" ||
        (result.audio?.codec && result.audio.codec !== "aac") ||
        !Number.isFinite(result.duration) || result.duration! <= 0))) {
    throw new InputError("Unsupported media. Use JPEG, PNG, WebP, GIF or MP4 with H.264/AAC, up to 4,000,000 bytes.");
  }
  return {
    src: result.secure_url, alt: "", publicId: result.public_id,
    kind: video ? "video" : "image", format: result.format as MediaItem["format"],
    width: result.width, height: result.height, bytes: result.bytes,
    ...(video ? { duration: result.duration, codec: result.video!.codec } : {}),
  };
}

export async function verifyMedia(items: MediaItem[], previous: MediaItem[] = []) {
  return Promise.all(items.map(async item => {
    const old = previous.find(old => old.src === item.src && old.publicId === item.publicId);
    // Existing records remain usable without inventing or trusting new metadata.
    if (old) return { ...old, alt: item.alt };
    if (!item.publicId?.startsWith("nacho-almira/projects/") || !item.kind) {
      throw new InputError("Upload new gallery media using the file selector.");
    }
    let resource;
    try {
      resource = await cloudinary.api.resource(item.publicId, { resource_type: item.kind, media_metadata: true });
    } catch {
      throw new InputError("Unable to verify uploaded media. Please upload it again.");
    }
    const verified = providerMedia(resource);
    if (verified.src !== item.src) throw new InputError("Media URL does not match the uploaded file.");
    return { ...verified, alt: item.alt };
  }));
}
