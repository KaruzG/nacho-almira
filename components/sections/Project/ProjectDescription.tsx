"use client"

import Button from "@/components/ui/Button";
import { GoArrowRight } from "react-icons/go";


interface ProjectDescriptionProps {
  shortDescription: string;
  description: string;
  mediaLink?: string;
}

export default function ProjectDescription({ shortDescription, description, mediaLink }: ProjectDescriptionProps) {
  const shortDescriptionStyles = "text-xl md:text-2xl font-light text-secondary mb-4";
  const descriptionStyles = "text-md md:text-lg max-w-[700px] text-secondary-dark leading-relaxed mb-8";
  const linkStyles = "inline-block text-[14px] font-bold tracking-wider uppercase text-accent border border-accent px-8 py-3 transition-all duration-200 hover:bg-accent hover:text-primary";

  return (
    <div className="flex flex-col">
      <p className={shortDescriptionStyles}>{shortDescription}</p>
      <p className={descriptionStyles}>{description}</p>
      {mediaLink && (
        <Button
          label="Link to media"
          variant="accent"
          size="md"
          className="mt-2 max-w-fit flex items-center gap-2"
          onClick={() => window.open(mediaLink, "_blank")}
        >
          Link to media <GoArrowRight size={22} />
        </Button>
      )}
    </div>
  );
}