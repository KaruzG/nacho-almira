"use client";

import { motion } from "motion/react";
import { getYouTubeId, getYouTubeAspect } from "@/lib/youtube";
import YouTubeHero from "./YouTubeHero";

interface HeroVideoProps {
  videoUrl?: string;
  /** Opcional: solo si necesitas forzar un aspecto raro (4:3, etc.). */
  videoAspect?: number;
}

const DEFAULT_VIDEO =
  "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4";

const HeroVideo = ({ videoUrl, videoAspect }: HeroVideoProps) => {
  const ytId = getYouTubeId(videoUrl);
  const aspect = videoAspect ?? getYouTubeAspect(videoUrl);
  const finalUrl = videoUrl || DEFAULT_VIDEO;

  return (
    <motion.div
      className="w-full relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {ytId ? (
        <YouTubeHero videoId={ytId} videoAspect={aspect} />
      ) : (
        <div className="h-[75vh] md:h-[70vh]">
          <video
            src={finalUrl}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:scale-105"
          />
        </div>
      )}
    </motion.div>
  );
};

export default HeroVideo;