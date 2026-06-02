"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import VideoControls from "@/components/ui/VideoControls";

interface YouTubeHeroProps {
  videoId: string;
  videoAspect?: number;
  /** Píxeles recortados arriba/abajo para esconder el chrome de YouTube. */
  chromePad?: number;
}

export default function YouTubeHero({
  videoId,
  videoAspect = 16 / 9,
  chromePad = 48,
}: YouTubeHeroProps) {
  const { hostRef, state, actions } = useYouTubePlayer({ videoId });

  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  useEffect(() => {
    reveal();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [reveal]);

  return (
    <div
      onMouseMove={reveal}
      onTouchStart={reveal}
      className="group relative w-full mx-auto overflow-hidden bg-primary"
      style={{ aspectRatio: String(videoAspect) }}
    >
      {/*
        La CAJA tiene el aspecto real -> el layout no mete bandas.
        El iframe se amplía SOLO chromePad px por lado (manteniendo aspecto),
        así se recorta el título/barra de YouTube sin recortar apenas imagen
        y sin que reaparezcan bandas internas.
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none [&_iframe]:pointer-events-none"
        style={{
          width: `calc(100% + ${chromePad * videoAspect * 2}px)`,
          height: `calc(100% + ${chromePad * 2}px)`,
        }}
      >
        <div ref={hostRef} className="w-full h-full" />
      </div>

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