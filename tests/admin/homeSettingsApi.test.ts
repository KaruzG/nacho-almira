import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({ auth: vi.fn(), configuration: vi.fn(), save: vi.fn() }));
vi.mock("../../lib/auth", () => ({ auth: mocks.auth }));
vi.mock("../../lib/home", () => ({ getHomeConfiguration: mocks.configuration }));
vi.mock("../../lib/models/SiteSettings", () => ({ default: { findByIdAndUpdate: mocks.save } }));
import { GET, PUT } from "../../app/api/settings/home/route";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.auth.mockResolvedValue({ user: {} });
  mocks.configuration.mockResolvedValue({ settings: { mode: "random" }, projects: [{ id: "eligible", title: "Film" }], invalidFixed: false });
  mocks.save.mockResolvedValue({});
});
const request = (data: unknown) => new NextRequest("http://localhost/api/settings/home", {
  method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
});
describe("home settings API", () => {
  it("requires authentication for reads and writes", async () => {
    mocks.auth.mockResolvedValue(null);
    expect((await GET()).status).toBe(401);
    expect((await PUT(request({ mode: "random" }))).status).toBe(401);
    expect(mocks.configuration).not.toHaveBeenCalled();
  });
  it("persists the singleton with validators", async () => {
    expect((await PUT(request({ mode: "fixed", projectId: "eligible" }))).status).toBe(200);
    expect(mocks.save).toHaveBeenCalledWith("home", { $set: { mode: "fixed", projectId: "eligible" } }, { upsert: true, runValidators: true });
  });
  it("rejects ineligible fixed projects", async () => {
    expect((await PUT(request({ mode: "fixed", projectId: "draft-or-removed" }))).status).toBe(400);
    expect(mocks.save).not.toHaveBeenCalled();
  });
  it("exposes fallback warnings without caching settings", async () => {
    mocks.configuration.mockResolvedValue({ settings: { mode: "fixed", projectId: "gone" }, projects: [], invalidFixed: true });
    const response = await GET();
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toMatchObject({ invalidFixed: true });
  });
});
