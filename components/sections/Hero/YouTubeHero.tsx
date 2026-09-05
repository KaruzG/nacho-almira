"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import VideoControls from "@/components/ui/VideoControls";

const subscribe = () => () => {};
const supportsFullscreen = () => !!document.fullscreenEnabled && !!HTMLElement.prototype.requestFullscreen;
const serverFullscreen = () => false;

export default function YouTubeHero({ videoId, videoAspect }: { videoId: string; videoAspect?: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const supports = useSyncExternalStore(subscribe, supportsFullscreen, serverFullscreen);
  const [nativeFallback, setNativeFallback] = useState(false);
  const nativeControls = !supports || nativeFallback;
  const [error, setError] = useState("");
  const { hostRef, state, actions } = useYouTubePlayer({ videoId, nativeControls });
  useEffect(() => {
    const change = () => setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener("fullscreenchange", change);
    return () => document.removeEventListener("fullscreenchange", change);
  }, []);
  async function toggleFullscreen() {
    setError("");
    try {
      if (document.fullscreenElement === container.current) await document.exitFullscreen();
      else await container.current?.requestFullscreen();
    } catch { setError("Fullscreen is unavailable. Try the native YouTube controls."); setNativeFallback(true); }
  }
  return (
    <div ref={container} className="relative w-full mx-auto bg-primary flex flex-col justify-center">
      <div className={`relative w-full ${videoAspect ? "" : "min-h-[240px] h-[60vh]"}`}
        style={videoAspect ? { aspectRatio: String(videoAspect), ...(fullscreen ? { maxHeight: "100dvh", width: `min(100%, ${videoAspect * 100}dvh)`, marginInline: "auto" } : {}) } : undefined}>
        <div className="absolute inset-0 [&_iframe]:w-full [&_iframe]:h-full">
          <div ref={hostRef} className="w-full h-full" />
        </div>
        {!nativeControls && <VideoControls visible {...state}
          onTogglePlay={actions.togglePlay} onToggleMute={actions.toggleMute}
          onVolume={actions.changeVolume} onSeek={actions.seek}
          fullscreen={fullscreen} onFullscreen={toggleFullscreen} />}
      </div>
      {error && <p role="alert" className="p-2 text-secondary">{error}</p>}
    </div>
  );
}
