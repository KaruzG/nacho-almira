"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useImageOrientation } from "@/hooks/useImageOrientation";
import { ProjectStill } from "../Projects/ProjectsGrid";

interface ProjectStillItemProps {
  still: ProjectStill;
  index: number;
}

export default function ProjectStillItem({ still, index }: ProjectStillItemProps) {
  const orientation = useImageOrientation(still.src);
  
  // We wait until the orientation is detected to avoid grid layout shifts.
  if (!orientation) return null;

  const imageBaseStyles = "w-full h-full object-cover";

  return (
    <motion.div
      className={`relative overflow-hidden w-full h-full ${
        orientation === "horizontal"
          ? "md:col-span-2"
          : "md:col-span-1"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <Image
        src={still.src}
        alt={still.alt}
        fill
        sizes={
          orientation === "horizontal"
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        className={imageBaseStyles}
      />
    </motion.div>
  );
}
