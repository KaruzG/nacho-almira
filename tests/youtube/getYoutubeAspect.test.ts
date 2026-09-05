import { describe, it, expect } from "vitest";
import { getYouTubeAspect } from "../../lib/youtube";

describe("declared original video dimensions", () => {
  it("does not infer dimensions from URLs, including Shorts", () => {
    expect(getYouTubeAspect(undefined, "https://youtube.com/shorts/dQw4w9WgXcQ")).toBeUndefined();
  });
  it.each([[4, 3], [1, 1], [9, 16], [239, 100]])("preserves %s:%s", (width, height) => {
    expect(getYouTubeAspect({ width, height, source: "admin", videoLink: "url" }, "url")).toBe(width / height);
  });
  it("rejects stale and invalid metadata", () => {
    expect(getYouTubeAspect({ width: 4, height: 3, source: "admin", videoLink: "old" }, "new")).toBeUndefined();
    expect(getYouTubeAspect({ width: Infinity, height: 3, source: "admin", videoLink: "url" }, "url")).toBeUndefined();
    expect(getYouTubeAspect({ width: 4, height: 0, source: "admin", videoLink: "url" }, "url")).toBeUndefined();
  });
});
