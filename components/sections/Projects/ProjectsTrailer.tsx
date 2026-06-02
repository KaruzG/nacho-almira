interface ProjectsTrailerProps {
  trailerUrl?: string;
  fallbackImage?: string;
  title: string;
}

export default function ProjectsTrailer({ trailerUrl, fallbackImage, title }: ProjectsTrailerProps) {
  const containerStyles = "w-full aspect-video rounded-xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-3 md:mb-5 relative shadow-lg group-hover:shadow-xl transition-shadow duration-500";
  const mediaStyles = "w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105";

  return (
    <div className={containerStyles}>
      {trailerUrl ? (
        <video 
          src={trailerUrl} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={mediaStyles}
        />
      ) : fallbackImage ? (
        <img
          src={fallbackImage}
          alt={title}
          className={mediaStyles}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-secondary-dark/5 text-secondary-dark/40 font-bold uppercase tracking-wider text-xs">
          No Preview
        </div>
      )}
    </div>
  );
}
