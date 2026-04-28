"use client";

import Image from "next/image";
import { ProjectStill } from "../Projects/ProjectsGrid";
import { motion } from "motion/react";

interface ProjectStillsProps {
  stills: ProjectStill[];
}

export default function ProjectStills({ stills }: ProjectStillsProps) {
  const containerStyles = "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:grid-flow-row-dense auto-rows-[250px] md:auto-rows-[350px] lg:auto-rows-[450px]";
  const imageBaseStyles = "w-full h-full object-cover";

  return (
    <div className="mt-16 md:mt-24">
      <motion.h3 
        className="text-sm font-bold uppercase tracking-wider text-secondary-dark mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        Film Stills
      </motion.h3>
      <div className={containerStyles}>
        {stills.map((still, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden w-full h-full ${
              still.orientation === "horizontal"
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
                still.orientation === "horizontal"
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className={imageBaseStyles}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
