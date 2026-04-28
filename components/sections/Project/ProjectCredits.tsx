"use client";

import { ProjectCredit } from "../Projects/ProjectsGrid";
import { motion } from "motion/react";

interface ProjectCreditsProps {
  credits: ProjectCredit[];
}

export default function ProjectCredits({ credits }: ProjectCreditsProps) {
  const roleStyles = "text-sm uppercase tracking-[0.15em] text-secondary-dark justify-start";
  const nameStyles = "text-md font-semibold text-secondary text-right";
  const titleStyles = "text-lg font-bold uppercase tracking-wider text-secondary pb-3 border-b border-secondary/20"

  return (
    <div className="flex flex-col gap-5">
      <motion.h3 
        className={titleStyles}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        Project Credits
      </motion.h3>
      {credits.map((credit, index) => (
        <motion.div 
          key={index} 
          className="flex flex-row justify-between items-center uppercase"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: 0.1 + index * 0.1, 
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
        >
          <span className={roleStyles}>{credit.role}</span>
          <span className={nameStyles}>{credit.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
