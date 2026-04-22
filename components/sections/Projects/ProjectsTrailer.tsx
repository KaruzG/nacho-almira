interface ProjectsTrailerProps {
  videoUrl: string;
}

export default function ProjectsTrailer({ videoUrl }: ProjectsTrailerProps) {

    const containerStyles = "w-full aspect-video rounded-xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-3 md:mb-5 relative shadow-lg group-hover:shadow-xl transition-shadow duration-500"
    const videoStyles = "w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"

    return (
    <div className={containerStyles}>
        <video 
        src={videoUrl} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={videoStyles}
        />
    </div>
    );
}
