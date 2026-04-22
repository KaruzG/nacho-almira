import Link from "next/link";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  return (
    <section className="w-full flex justify-center">
      <Link 
        href="#projects" 
        className="block w-full max-w-[1400px] 2xl:my-8 2xl:px-8 cursor-pointer"
      >
        <HeroVideo />
      </Link>
    </section>
  );
};

export default Hero;
