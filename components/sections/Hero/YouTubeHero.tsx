"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { useCoverSize } from "@/hooks/useCoverSize";
import VideoControls from "@/components/ui/VideoControls";

interface YouTubeHeroProps {
  videoId: string;
  videoAspect?: number;
  overscan?: number;
}

export default function YouTubeHero({ videoId, videoAspect = 16 / 9, overscan = 1.3 }: YouTubeHeroProps) {
  const { ref, size } = useCoverSize<HTMLDivElement>(videoAspect, overscan);
  const { hostRef, state, actions } = useYouTubePlayer({ videoId });

  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  useEffect(() => {
    reveal(); // se muestran al cargar y se ocultan solas
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [reveal]);

  return (
    <div
      ref={ref}
      onMouseMove={reveal}
      onTouchStart={reveal}
      className="group w-full h-full relative overflow-hidden bg-primary"
    >
      {/* El iframe NO recibe eventos: así YouTube nunca muestra sus controles */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none [&_iframe]:pointer-events-none"
        style={{ width: size.w || "100%", height: size.h || "100%" }}
      >
        <div ref={hostRef} className="w-full h-full" />
      </div>

      {/* Capa que captura el toque: muestra TUS controles y bloquea el player */}
      <button
        type="button"
        aria-label="Mostrar controles"
        onClick={reveal}
        className="absolute inset-0 z-10 w-full h-full cursor-default"
      />

      <VideoControls
        visible={controlsVisible}
        {...state}
        onTogglePlay={actions.togglePlay}
        onToggleMute={actions.toggleMute}
        onVolume={actions.changeVolume}
        onSeek={actions.seek}
      />
    </div>
  );
}