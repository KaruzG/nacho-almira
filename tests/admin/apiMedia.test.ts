import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(), upload: vi.fn(), destroy: vi.fn(), create: vi.fn(), find: vi.fn(), update: vi.fn(),
}));
vi.mock("../../lib/auth", () => ({ auth: mocks.auth }));
vi.mock("../../lib/db/mongoose", () => ({ default: vi.fn() }));
vi.mock("../../lib/cloudinary", () => ({ default: { uploader: { upload_stream: mocks.upload, destroy: mocks.destroy } } }));
vi.mock("../../lib/models/Project", () => ({ default: { create: mocks.create, findById: mocks.find, findByIdAndUpdate: mocks.update } }));
import { POST as upload } from "../../app/api/upload/route";
import { POST as create } from "../../app/api/projects/route";
import { PUT as update } from "../../app/api/projects/[id]/route";

const result = { secure_url: "https://res.cloudinary.com/demo/image/upload/x.gif", public_id: "nacho-almira/projects/x",
  resource_type: "image", format: "gif", width: 2, height: 2, bytes: 100 };
function fileRequest(file: File) {
  const form = new FormData(); form.append("file", file);
  return new NextRequest("http://localhost/api/upload", { method: "POST", body: form });
}
const payload = { title: "Film", type: "Personal", category: "123456789012345678901234", year: 2026,
  videoLink: "https://youtu.be/dQw4w9WgXcQ", media: [], credits: [], visibility: "draft" };
const jsonRequest = (body: unknown) => new NextRequest("http://localhost/api/projects", { method: "POST",
  headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
beforeEach(() => {
  vi.clearAllMocks();
  mocks.auth.mockResolvedValue({ user: { role: "admin" } });
  mocks.destroy.mockResolvedValue({});
  mocks.upload.mockImplementation((_options, callback) => ({ end: () => callback(null, result) }));
});
describe("upload API", () => {
  it("requires authentication before processing media", async () => {
    mocks.auth.mockResolvedValue(null);
    expect((await upload(fileRequest(new File(["gif"], "x.gif", { type: "image/gif" })))).status).toBe(401);
    expect(mocks.upload).not.toHaveBeenCalled();
  });
  it("rejects oversized and unsupported files before Cloudinary", async () => {
    expect((await upload(fileRequest(new File([new Uint8Array(4_000_001)], "x.gif", { type: "image/gif" })))).status).toBe(413);
    expect((await upload(fileRequest(new File(["svg"], "x.svg", { type: "image/svg+xml" })))).status).toBe(400);
    expect(mocks.upload).not.toHaveBeenCalled();
  });
  it("returns the original verified provider response", async () => {
    const response = await upload(fileRequest(new File(["gif"], "x.gif", { type: "image/gif" })));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ url: result.secure_url, format: "gif", width: 2, height: 2 });
    expect(mocks.upload.mock.calls[0][0]).not.toHaveProperty("transformation");
  });
  it("rejects mismatched contents and cleans up the rejected asset", async () => {
    const response = await upload(fileRequest(new File(["gif"], "x.png", { type: "image/png" })));
    expect(response.status).toBe(400); expect(mocks.destroy).toHaveBeenCalled();
  });
  it("reports provider failure", async () => {
    mocks.upload.mockImplementation((_options, callback) => ({ end: () => callback(new Error("bad file")) }));
    expect((await upload(fileRequest(new File(["gif"], "x.gif", { type: "image/gif" })))).status).toBe(400);
  });
});
describe("CRUD API", () => {
  it("rejects forged metadata and invalid fields without writing", async () => {
    expect((await create(jsonRequest({ ...payload, year: "bad" }))).status).toBe(400);
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it("creates a valid project", async () => {
    mocks.create.mockImplementation(async value => value);
    expect((await create(jsonRequest(payload))).status).toBe(201);
  });
  it("uses validators and clears old presentation on update", async () => {
    mocks.find.mockReturnValue({ lean: async () => ({ ...payload, videoLink: "https://youtu.be/aaaaaaaaaaa" }) });
    mocks.update.mockResolvedValue(payload);
    expect((await update(jsonRequest(payload), { params: Promise.resolve({ id: "123456789012345678901234" }) })).status).toBe(200);
    expect(mocks.update.mock.calls[0][1].$set.videoPresentation).toBeNull();
    expect(mocks.update.mock.calls[0][2]).toMatchObject({ runValidators: true });
  });
});
