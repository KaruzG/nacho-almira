import { describe, it, expect } from "vitest";
import { getYouTubeId } from "../../lib/youtube";

describe("getYouTubeId", () => {
  it("returns null when url is undefined", () => {
    expect(getYouTubeId(undefined)).toBeNull();
  });

  it("returns null when url is empty string", () => {
    expect(getYouTubeId("")).toBeNull();
  });

  it("returns null for an unrelated url", () => {
    expect(getYouTubeId("https://vimeo.com/123456789")).toBeNull();
  });

  it("extracts id from a standard watch url", () => {
    expect(getYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts id from a youtu.be short url", () => {
    expect(getYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts id from an embed url", () => {
    expect(getYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts id from a shorts url", () => {
    expect(getYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("returns null when the id segment is shorter than 11 characters", () => {
    expect(getYouTubeId("https://www.youtube.com/watch?v=short")).toBeNull();
  });
});