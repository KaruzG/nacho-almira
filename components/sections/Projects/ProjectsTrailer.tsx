"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectsTrailer({ trailerUrl, fallbackImage, title }: {
  trailerUrl?: string; fallbackImage?: string; title: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const active = useRef(false);
  const generation = useRef(0);
  const [playing, setPlaying] = useState(false);
  function stop() {
    active.current = false;
    generation.current += 1;
    if (video.current) { video.current.pause(); video.current.currentTime = 0; }
    setPlaying(false);
  }
  useEffect(() => {
    const media = video.current;
    const hidden = () => { if (document.hidden) stop(); };
    const capability = window.matchMedia("(hover: hover) and (pointer: fine)");
    const changed = () => { if (!capability.matches) stop(); };
    document.addEventListener("visibilitychange", hidden);
    capability.addEventListener("change", changed);
    return () => {
      active.current = false; media?.pause();
      document.removeEventListener("visibilitychange", hidden);
      capability.removeEventListener("change", changed);
    };
  }, [trailerUrl]);
  return (
    <div className="w-full aspect-video overflow-hidden bg-primary mb-3 md:mb-5 relative"
      onPointerEnter={async event => {
        if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || document.hidden || !video.current) return;
        active.current = true;
        const request = ++generation.current;
        const media = video.current;
        try {
          await media.play();
          if (!active.current || document.hidden) { media.pause(); media.currentTime = 0; }
          else if (request === generation.current) setPlaying(true);
        } catch { if (request === generation.current) stop(); }
      }} onPointerLeave={stop} onPointerCancel={stop}>
      {fallbackImage ? <Image src={fallbackImage} alt={title} fill className="object-contain" loading="lazy" /> :
        <div className="absolute inset-0 flex items-center justify-center text-secondary-dark text-xs uppercase">{title} — Preview</div>}
      {trailerUrl && <video ref={video} src={trailerUrl} loop muted playsInline preload="none" poster={fallbackImage}
        aria-label={`${title} preview`} onError={stop}
        className={`absolute inset-0 w-full h-full object-contain ${playing ? "opacity-100" : "opacity-0"}`} />}
    </div>
  );
}
