const HeroVideo = () => {

  const videoUrl = "https://res.cloudinary.com/dmfyvtezz/video/upload/v1776817190/videoHero_k654bx.mp4";

  return (
    <>
      <div className="w-full h-[75vh] md:h-[70vh] relative overflow-hidden">
        <video 
          src={videoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:scale-105"
        />
      </div>
    </>
  )
};

export default HeroVideo;
