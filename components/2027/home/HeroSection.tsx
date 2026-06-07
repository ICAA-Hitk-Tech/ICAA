import Image from "next/image";
import Link from "next/link";
import { FaLaptop, FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
	return (
    <div className="flex flex-col lg:flex-row px-8 pt-30 gap-10 w-full">
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <span className="text-abyss-500 font-bold text-xl lg:text-2xl">
          January 06, 2027 – January 08, 2027
        </span>
        <h1 className="text-6xl font-serif font-bold">
          International Conference on{" "}
          <span className="text-abyss-500">Applied</span>{" "}
          <span className="text-grove-600">Algorithms</span>
        </h1>

        <p className="mt-3 text-ink-dim/80">
          ICAA is a conference series with a mission to provide a quality forum
          for researchers working in applied algorithms. Lorem ipsum dolor sit
		  amet, consectetur adipiscing elit. Donec vel sapien eget nunc luctus
		  commodo. Donec in felis eget enim convallis tincidunt. Lorem ipsum
		  dolor sit amet, consectetur adipiscing elit.	
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-ink bg-chrome-400 text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-chrome-600 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
            <FaLaptop className="w-5 h-5" />
            <span>In Hybrid Mode</span>
          </button>
          <Link href="/2027/papersubmission">
            <button className="group flex items-center gap-2 px-6 py-3 border-2 border-ink bg-sea-500 text-paper font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-sea-700 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
              <span>Submit Papers</span>
              <FaArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-start">
        <div className="relative w-full p-8">
          <Image
            src="/2027/hero.png"
            alt="ICAA 2027 hero"
            width={800}
            height={533}
            className="w-full h-auto object-cover block"
            priority
          />
          <div className="absolute inset-8 border-4 border-ink pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
