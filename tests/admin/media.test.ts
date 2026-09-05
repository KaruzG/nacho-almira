import { describe, it, expect, vi } from "vitest";
vi.mock("../../lib/cloudinary", () => ({ default: { api: { resource: vi.fn() } } }));
import cloudinary from "../../lib/cloudinary";
import { MAX_MEDIA_BYTES, validateFile, staticPoster, isAnimatedImage } from "../../lib/media";
import { providerMedia, verifyMedia } from "../../lib/mediaServer";
import { validateProject } from "../../lib/projectValidation";

const resource = { secure_url: "https://res.cloudinary.com/demo/image/upload/test.gif",
  public_id: "nacho-almira/projects/test", resource_type: "image", format: "gif", width: 40, height: 30, bytes: 100 };
const base = { title: "Film", type: "Personal", category: "123456789012345678901234",
  year: 2026, videoLink: "https://youtu.be/dQw4w9WgXcQ", media: [], credits: [], visibility: "published" };
describe("media policy", () => {
  it.each(["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4"])("allows %s", type => {
    expect(() => validateFile({ type, size: MAX_MEDIA_BYTES })).not.toThrow();
  });
  it("rejects oversized, empty and unsupported files", () => {
    for (const file of [{ type: "image/gif", size: 0 }, { type: "image/png", size: MAX_MEDIA_BYTES + 1 }, { type: "image/svg+xml", size: 50 }]) {
      expect(() => validateFile(file)).toThrow();
    }
  });
  it("preserves original GIF URL and dimensions without transforming frames", () => {
    expect(providerMedia(resource)).toMatchObject({ src: resource.secure_url, kind: "image", format: "gif", width: 40, height: 30 });
    expect(isAnimatedImage({ src: resource.secure_url, alt: "" })).toBe(true);
    expect(staticPoster([{ src: "https://cdn/film.mp4", alt: "", kind: "video" }, { src: resource.secure_url, alt: "" }, { src: "https://cdn/still.jpg", alt: "" }])).toBe("https://cdn/still.jpg");
  });
  it("requires real dimensions and H.264/AAC for MP4", () => {
    expect(() => providerMedia({ ...resource, width: 0 })).toThrow();
    const video = { ...resource, format: "mp4", resource_type: "video", duration: 2, video: { codec: "h264" } };
    expect(providerMedia(video).kind).toBe("video");
    expect(() => providerMedia({ ...video, video: { codec: "hevc" } })).toThrow();
    expect(() => providerMedia({ ...video, audio: { codec: "opus" } })).toThrow();
  });
  it("verifies provider metadata rather than trusting payload values", async () => {
    vi.mocked(cloudinary.api.resource).mockResolvedValue(resource);
    const [media] = await verifyMedia([{ ...providerMedia(resource), width: 999 }]);
    expect(media.width).toBe(40);
    await expect(verifyMedia([{ src: "https://other/file.jpg", alt: "" }])).rejects.toThrow();
  });
  it("preserves legacy records only on the same project", async () => {
    const old = { src: "https://cdn/old.jpg", alt: "old" };
    expect(await verifyMedia([{ ...old, kind: "video", width: 900 }], [old])).toEqual([old]);
    await expect(verifyMedia([old])).rejects.toThrow();
  });
});
describe("project CRUD validation", () => {
  it.each(["http://cdn.example/movie.mp4", "https://cdn.example/movie.mp4?token=legacy"])(
    "allows title edits without replacing a legacy main video: %s", async videoLink => {
      const data = await validateProject({ ...base, title: "Updated title", videoLink }, { videoLink, media: [] });
      expect(data.title).toBe("Updated title");
      expect(data.videoLink).toBe(videoLink);
      expect(data.videoPresentation).toBeUndefined();
    },
  );
  it("rejects creating or replacing with a non-YouTube main video", async () => {
    const videoLink = "https://cdn.example/movie.mp4";
    const payload = { ...base, videoLink };
    await expect(validateProject(payload)).rejects.toThrow("YouTube");
    await expect(validateProject(payload, { videoLink: base.videoLink, media: [] })).rejects.toThrow("YouTube");
    await expect(validateProject(payload, { videoLink: `${videoLink}?old=1`, media: [] })).rejects.toThrow("YouTube");
    expect((await validateProject(base, { videoLink, media: [] })).videoLink).toBe(base.videoLink);
  });
  it.each(["not a URL", "javascript:alert(1)", "file:///movie.mp4", "ftp://cdn.example/movie.mp4"])(
    "rejects unsafe or invalid legacy main video URLs: %s", async videoLink => {
      await expect(validateProject({ ...base, videoLink }, { videoLink, media: [] })).rejects.toThrow("YouTube");
    },
  );
  it("persists removal of optional links and descriptions from a full form payload", async () => {
    const data = await validateProject(base, { videoLink: base.videoLink, trailerLink: "https://cdn/old.mp4", media: [] });
    expect(data).toMatchObject({ trailerLink: "", description: "", mediaLink: "" });
  });
  it("clears stale dimensions when the main video changes", async () => {
    const previous = { videoLink: "https://youtu.be/aaaaaaaaaaa", media: [] };
    const data = await validateProject({ ...base, videoPresentation: { width: 1920, height: 1080, source: "admin", videoLink: previous.videoLink } }, previous);
    expect(data.videoPresentation).toBeNull();
  });
  it("rejects bad fields and non-YouTube main video", async () => {
    await expect(validateProject({ ...base, videoLink: "https://cdn/movie.mp4" })).rejects.toThrow();
    await expect(validateProject({ ...base, media: [{ ...providerMedia(resource), bytes: MAX_MEDIA_BYTES + 1 }] })).rejects.toThrow();
  });
});
