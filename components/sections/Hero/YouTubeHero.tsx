"use client";

import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { useCoverSize } from "@/hooks/useCoverSize";
import VideoControls from "@/components/ui/VideoControls";

interface YouTubeHeroProps {
  videoId: string;
  /** Aspecto real del vídeo (ancho/alto). Por defecto 16:9. */
  videoAspect?: number;
}

export default function YouTubeHero({ videoId, videoAspect = 16 / 9 }: YouTubeHeroProps) {
  const { ref, size } = useCoverSize<HTMLDivElement>(videoAspect);
  const { hostRef, state, actions } = useYouTubePlayer({ videoId });

  return (
    <div ref={ref} className="group w-full h-full relative overflow-hidden bg-primary">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: size.w || "100%", height: size.h || "100%" }}
      >
        <div ref={hostRef} className="w-full h-full" />
      </div>

      <button
        type="button"
        aria-label={state.playing ? "Pausar" : "Reproducir"}
        onClick={actions.togglePlay}
        className="absolute inset-0 z-10 w-full h-full cursor-default"
      />

      <VideoControls
        {...state}
        onTogglePlay={actions.togglePlay}
        onToggleMute={actions.toggleMute}
        onVolume={actions.changeVolume}
        onSeek={actions.seek}
      />
    </div>
  );
}