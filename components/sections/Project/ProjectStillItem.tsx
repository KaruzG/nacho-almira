"use client";

import Image from "next/image";
import { useState } from "react";
import { isAnimatedImage } from "@/lib/media";
import { ProjectStill } from "../Projects/ProjectsGrid";

export default function ProjectStillItem({ still }: { still: ProjectStill; index: number }) {
  const [error, setError] = useState(false);
  const [naturalAspect, setNaturalAspect] = useState(1);
  const horizontal = still.width && still.height ? still.width > still.height : naturalAspect > 1;
  return (
    <div className={`relative w-full h-full ${horizontal ? "md:col-span-2" : "md:col-span-1"}`}>
      {error ? <p role="status" className="p-4">Unable to load {still.alt || "media"}. <a href={still.src} className="underline">Open original</a></p> :
        still.kind === "video" ? <video src={still.src} controls playsInline preload="metadata"
          aria-label={still.alt || "Gallery video"} width={still.width} height={still.height}
          onError={() => setError(true)} className="w-full h-full object-contain">
          Your browser cannot play this MP4. <a href={still.src}>Open video</a>
        </video> : <Image src={still.src} alt={still.alt} fill
          unoptimized={isAnimatedImage(still)} onError={() => setError(true)}
          onLoad={event => setNaturalAspect(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)}
          sizes={horizontal ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-contain" />}
    </div>
  );
}
