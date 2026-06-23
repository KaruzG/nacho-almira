import { describe, it, expect } from "vitest";
import { getYouTubeAspect } from "../../lib/youtube";

describe("getYouTubeAspect", () => {
  it("returns 16/9 when url is undefined", () => {
    expect(getYouTubeAspect(undefined)).toBeCloseTo(16 / 9);
  });

  it("returns 16/9 for a standard watch url", () => {
    expect(getYouTubeAspect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBeCloseTo(16 / 9);
  });

  it("returns 16/9 for an embed url", () => {
    expect(getYouTubeAspect("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBeCloseTo(16 / 9);
  });

  it("returns 9/16 for a shorts url", () => {
    expect(getYouTubeAspect("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBeCloseTo(9 / 16);
  });
});