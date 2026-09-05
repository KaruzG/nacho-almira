"use client";

import { getYouTubeId } from "@/lib/youtube";
import { isHttpUrl } from "@/lib/media";
import YouTubeHero from "./YouTubeHero";

export default function HeroVideo({ videoUrl, videoAspect }: { videoUrl?: string; videoAspect?: number }) {
  const ytId = getYouTubeId(videoUrl);
  if (ytId) return <YouTubeHero videoId={ytId} videoAspect={videoAspect} />;
  if (isHttpUrl(videoUrl)) {
    return <video src={videoUrl} controls playsInline preload="metadata" className="block w-full h-auto" />;
  }
  return <p className="p-6">Video unavailable.</p>;
}
