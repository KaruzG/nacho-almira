import { describe, it, expect } from "vitest";
import { buildPayload, createRequestOptions, submitProject, uploadTrailer, ProjectPayload } from "../../lib/admin/projectService";

describe("projectService", () => {
  it("builds payload with defaults and optional fields", () => {
    const partial: Partial<ProjectPayload> = {
      title: "T",
      category: "cat",
      year: 2020,
      videoLink: "v",
      media: [],
      credits: [],
    };

    const payload = buildPayload(partial);
    expect(payload.title).toBe("T");
    expect(payload.type).toBe("Personal");
    expect(payload.media).toEqual([]);
    expect(payload.description).toBeUndefined();
  });

  it("creates correct request options for create and update", () => {
    const payload = buildPayload({ title: "x", category: "c", year: 2021, videoLink: "u", media: [], credits: [] });
    const createReq = createRequestOptions(payload);
    expect(createReq.url).toBe("/api/projects");
    expect(createReq.options?.method).toBe("POST");

    const updateReq = createRequestOptions(payload, "abc123");
    expect(updateReq.url).toBe("/api/projects/abc123");
    expect(updateReq.options?.method).toBe("PUT");
  });

  it("submitProject calls fetch with correct args", async () => {
    const payload = buildPayload({ title: "x", category: "c", year: 2021, videoLink: "u", media: [], credits: [] });
    const mockFetch = async (url: string, options?: RequestInit) => {
      return { ok: true, url, options } as unknown as Response;
    };

    const res = await submitProject(payload, undefined, mockFetch as unknown as typeof fetch);
    expect((res as unknown as { url?: string }).url).toBe("/api/projects");
    // ensure method passed
    expect((res as unknown as { options?: RequestInit }).options?.method).toBe("POST");
  });

  it("uploadTrailer posts FormData and returns json", async () => {
    const fakeFile = new File(["a"], "a.mp4", { type: "video/mp4" });
    const mockFetch = async (url: string, options?: RequestInit) => {
      return {
        ok: true,
        json: async () => ({ url: "https://cdn/test.mp4" }),
      } as unknown as Response;
    };

    const result = await uploadTrailer(fakeFile, mockFetch as unknown as typeof fetch);
    expect(result.url).toBe("https://cdn/test.mp4");
  });
});
