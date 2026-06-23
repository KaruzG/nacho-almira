export interface ProjectPayload {
  title: string;
  type: "Personal" | "Ad-Film";
  category: string;
  year: number;
  videoLink: string;
  trailerLink?: string;
  description?: string;
  media: { src: string; alt: string; publicId?: string }[];
  credits: { role: string; name: string }[];
  mediaLink?: string;
  visibility: "draft" | "published";
}

export function buildPayload(formState: Partial<ProjectPayload>): ProjectPayload {
  return {
    title: String(formState.title || ""),
    type: (formState.type as "Personal" | "Ad-Film") || "Personal",
    category: String(formState.category || ""),
    year: Number(formState.year || new Date().getFullYear()),
    videoLink: String(formState.videoLink || ""),
    trailerLink: formState.trailerLink || undefined,
    description: formState.description || undefined,
    media: formState.media || [],
    credits: formState.credits || [],
    mediaLink: formState.mediaLink || undefined,
    visibility: (formState.visibility as "draft" | "published") || "draft",
  };
}

export function createRequestOptions(payload: ProjectPayload, editingId?: string) {
  const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
  const method = editingId ? "PUT" : "POST";
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return { url, options };
}

export async function submitProject(
  payload: ProjectPayload,
  editingId?: string,
  fetchImpl: typeof fetch = fetch
) {
  const { url, options } = createRequestOptions(payload, editingId);
  const res = await fetchImpl(url, options as any);
  return res;
}

export async function uploadTrailer(file: File, fetchImpl: typeof fetch = fetch) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetchImpl("/api/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
