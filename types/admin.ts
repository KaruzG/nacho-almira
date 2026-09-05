import type { MediaItem, VideoPresentation } from "@/lib/media";
export interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

export interface ProjectData {
  _id: string;
  type: "Personal" | "Ad-Film";
  title: string;
  category: CategoryOption;
  year: number;
  videoLink: string;
  videoPresentation?: VideoPresentation;
  trailerLink?: string;
  description?: string;
  media: MediaItem[];
  credits: { role: string; name: string }[];
  mediaLink?: string;
  visibility: "draft" | "published";
  createdAt: string;
}
