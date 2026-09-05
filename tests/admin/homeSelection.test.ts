import { describe, it, expect } from "vitest";
import { homeCandidates, selectHome } from "../../lib/homeSelection";

const videoUrl = "https://youtube.com/watch?v=dQw4w9WgXcQ";
const project = { id: "1", title: "Film", tag: "", videoUrl,
  videoPresentation: { width: 4, height: 3, source: "admin" as const, videoLink: videoUrl } };
describe("home selection", () => {
  it("excludes unknown and stale dimensions", () => {
    expect(homeCandidates([{ ...project, videoPresentation: undefined }, { ...project, videoUrl: "https://example.com" }])).toEqual([]);
  });
  it("selects randomly and honors a valid fixed project", () => {
    const projects = [project, { ...project, id: "2" }];
    expect(selectHome(projects, { mode: "random" }, () => 0).project?.id).toBe("1");
    expect(selectHome(projects, { mode: "random" }, () => .9).project?.id).toBe("2");
    expect(selectHome(projects, { mode: "fixed", projectId: "1" }, () => .9).project?.id).toBe("1");
  });
  it("falls back from an invalid fixed project and handles no candidates", () => {
    expect(selectHome([project], { mode: "fixed", projectId: "gone" })).toMatchObject({ project, invalidFixed: true });
    expect(selectHome([], { mode: "random" }).project).toBeNull();
  });
});
