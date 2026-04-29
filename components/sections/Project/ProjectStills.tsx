"use client";

import { ProjectStill } from "../Projects/ProjectsGrid";
import { motion } from "motion/react";
import ProjectStillItem from "./ProjectStillItem";

interface ProjectStillsProps {
  stills: ProjectStill[];
}

export default function ProjectStills({ stills }: ProjectStillsProps) {
  const containerStyles = "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:grid-flow-row-dense auto-rows-[250px] md:auto-rows-[350px] lg:auto-rows-[450px]";

  return (
    <div className="mt-16 md:mt-24">
      <motion.h3 
        className="text-sm font-bold uppercase tracking-wider text-secondary-dark mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        Selected Media
      </motion.h3>
      <div className={containerStyles}>
        {stills.map((still, index) => (
          <ProjectStillItem key={index} still={still} index={index} />
        ))}
      </div>
    </div>
  );
}
