import { validateFile, type MediaItem, type VideoPresentation } from "@/lib/media";
export interface ProjectPayload {
  title: string;
  type: "Personal" | "Ad-Film";
  category: string;
  year: number;
  videoLink: string;
  videoPresentation?: VideoPresentation | null;
  trailerLink?: string;
  description?: string;
  media: MediaItem[];
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
    videoPresentation: formState.videoPresentation ?? null,
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
  const res = await fetchImpl(url, options);
  return res;
}

export async function uploadTrailer(file: File, fetchImpl: typeof fetch = fetch) {
  validateFile(file, true);
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetchImpl("/api/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
  return (await res.json()) as { url: string };
}
