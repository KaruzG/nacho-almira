"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroVideo from "./HeroVideo";
import type { Project } from "@/components/sections/Projects/ProjectsGrid";
import { selectHome, type HomeSettings } from "@/lib/homeSelection";
import { getYouTubeAspect } from "@/lib/youtube";

export default function Hero({ projects, settings }: { projects: Project[]; settings: HomeSettings }) {
  const [selection, setSelection] = useState<{ project: Project | null } | null>(null);
  useEffect(() => { setSelection(selectHome(projects, settings)); }, [projects, settings]);
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] 2xl:my-8 2xl:px-8">
        {!selection ? <p className="p-8" role="status">Loading video…</p> : selection.project ? (
          <HeroVideo videoUrl={selection.project.videoUrl} videoAspect={getYouTubeAspect(selection.project.videoPresentation, selection.project.videoUrl)} />
        ) : <p className="p-8">No featured video available.</p>}
        <Link href="/projects" className="inline-block p-4 text-accent underline">View projects</Link>
      </div>
    </section>
  );
}
