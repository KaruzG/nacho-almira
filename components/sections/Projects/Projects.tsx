const projectsMock = [
  {
    id: 1,
    title: "Project Alpha",
    tag: "Design & Development",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 2,
    title: "Project Beta",
    tag: "Art Direction",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 3,
    title: "Project Gamma",
    tag: "3D Animation",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  },
  {
    id: 4,
    title: "Project Delta",
    tag: "Web Experience",
    videoUrl: "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="w-full py-24 px-4 md:px-8 flex flex-col items-center bg-white dark:bg-zinc-950">
      <div className="w-full max-w-[1400px]">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-black dark:text-white">
          Selected Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 lg:gap-x-12">
          {projectsMock.map((project) => (
            <div key={project.id} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-video rounded-xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 md:mb-8 relative shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                <video 
                  src={project.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col px-2">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-3 text-black dark:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] font-medium">
                  {project.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
