import Link from "next/link";

interface ProjectDescriptionProps {
  shortDescription: string;
  description: string;
  mediaLink?: string;
}

export default function ProjectDescription({ shortDescription, description, mediaLink }: ProjectDescriptionProps) {
  const shortDescriptionStyles = "text-lg md:text-xl font-semibold text-secondary mb-4";
  const descriptionStyles = "text-sm md:text-base text-secondary-dark leading-relaxed mb-8";
  const linkStyles = "inline-block text-[14px] font-bold tracking-wider uppercase text-accent border border-accent px-8 py-3 transition-all duration-200 hover:bg-accent hover:text-primary";

  return (
    <div className="flex flex-col">
      <p className={shortDescriptionStyles}>{shortDescription}</p>
      <p className={descriptionStyles}>{description}</p>
      {mediaLink && (
        <Link
          href={mediaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          Link to media
        </Link>
      )}
    </div>
  );
}