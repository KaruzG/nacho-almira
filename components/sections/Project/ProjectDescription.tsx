"use client"

import Button from "@/components/ui/Button";
import { GoArrowRight } from "react-icons/go";
import { motion } from "motion/react";

interface ProjectDescriptionProps {
  shortDescription: string;
  description: string;
  mediaLink?: string;
}

export default function ProjectDescription({ shortDescription, description, mediaLink }: ProjectDescriptionProps) {
  const shortDescriptionStyles = "text-xl md:text-2xl font-light text-secondary mb-4";
  const descriptionStyles = "text-md md:text-lg max-w-[700px] text-secondary-dark leading-relaxed mb-8";

  return (
    <div className="flex flex-col">
      <motion.p 
        className={shortDescriptionStyles}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {shortDescription}
      </motion.p>
      <motion.p 
        className={descriptionStyles}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {description}
      </motion.p>
      {mediaLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Button
            label="Link to media"
            variant="accent"
            size="md"
            className="mt-2 max-w-fit flex items-center gap-2"
            onClick={() => window.open(mediaLink, "_blank")}
          >
            Link to media <GoArrowRight size={22} />
          </Button>
        </motion.div>
      )}
    </div>
  );
}