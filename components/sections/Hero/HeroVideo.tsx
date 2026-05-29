"use client";

import { motion } from "motion/react";

interface HeroVideoProps {
  videoUrl?: string;
}

const HeroVideo = ({ videoUrl }: HeroVideoProps) => {
  const defaultVideoUrl = "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4";
  const finalVideoUrl = videoUrl || defaultVideoUrl;

  return (
    <motion.div 
      className="w-full h-[75vh] md:h-[70vh] relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <video 
        src={finalVideoUrl} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:scale-105"
      />
    </motion.div>
  );
};

export default HeroVideo;
