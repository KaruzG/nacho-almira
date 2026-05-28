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
  description?: string;
  media: { src: string; alt: string; publicId?: string }[];
  credits: { role: string; name: string }[];
  mediaLink?: string;
  visibility: "draft" | "published";
  createdAt: string;
}
