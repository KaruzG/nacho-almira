"use client";

import Hero from "@/components/sections/Hero/Hero";
import ProjectSection from "@/components/sections/Project/ProjectSection";
import ProjectsTrailer from "@/components/sections/Projects/ProjectsTrailer";
import ProjectFormMedia from "@/components/admin/dashboard/ProjectFormMedia";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";

const gif = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQAFAAAACwAAAAAAQABAAACAkQBACH5BAAUAAAALAAAAAABAAEAAAICTAEAOw==";
const videoUrl = "https://youtu.be/dQw4w9WgXcQ";
const projects = [4 / 3, 1, 9 / 16, 2.39].map((aspect, index) => ({
  id: String(index), title: `Film ${index}`, type: "Personal", tag: "Test", videoUrl,
  videoPresentation: { width: Math.round(aspect * 1200), height: 1200, source: "admin" as const, videoLink: videoUrl },
  credits: [{ role: "Director", name: "Test" }], description: "Project description", mediaLink: "https://example.com/media",
  stills: [{ src: gif, alt: "Two-frame animated GIF", kind: "image" as const, format: "gif" as const, width: 1, height: 1 },
    { src: "/__media_test_clip.mp4", alt: "MP4 gallery", kind: "video" as const, format: "mp4" as const, width: 640, height: 360 }],
}));
const legacyProject = {
  ...projects[0], id: "legacy", title: "Legacy main video",
  videoUrl: "https://media.example.test/legacy.mp4", videoPresentation: undefined, stills: [],
};

export default function MediaTestPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  return (
    <main>
      <div data-testid="home"><Hero projects={[...projects, legacyProject]} settings={{ mode: "random" }} /></div>
      <a href="#detail" data-testid="preview"><ProjectsTrailer trailerUrl="/__media_test_clip.mp4" title="Preview test" /></a>
      <div data-testid="upload"><ProjectFormMedia media={media} setMedia={setMedia} /></div>
      {projects.map(project => <div id={project.id === "0" ? "detail" : undefined} data-testid={`detail-${project.id}`} key={project.id}><ProjectSection project={project} /></div>)}
      <div data-testid="detail-legacy"><ProjectSection project={legacyProject} /></div>
    </main>
  );
}
