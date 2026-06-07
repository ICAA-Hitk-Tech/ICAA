import Image from "next/image";
import Link from "next/link";
import { FaLaptop, FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <>
      {/* Computer / Desktop View */}
      <div className="hidden lg:flex flex-row px-6 md:px-12 lg:px-16 pt-28 pb-16 gap-12 lg:gap-16 items-center w-full">
        {/* Left Content Column */}
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <span className="text-abyss-500 font-mono font-extrabold lg:text-3xl tracking-wider uppercase">
            January 06, 2027 – January 08, 2027
          </span>
          {/*<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight">*/}
          <h1 className="text-6xl font-serif font-bold text-ink leading-tight">
            International Conference on{" "}
            <span className="text-abyss-500">Applied</span>{" "}
            <span className="text-grove-600">Algorithms</span>
          </h1>

          <p className="text-ink-dim/90 font-sans text-sm md:text-base leading-relaxed text-justify">
            ICAA is a conference series with a mission to provide a high-quality forum for researchers working in applied algorithms. It brings together academicians, industry professionals, and practitioners to exchange ideas, present cutting-edge research, and discuss emerging challenges in algorithm design and analysis. The conference fosters collaboration and innovation across diverse domains where algorithmic solutions play a critical role.{" "}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
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

        {/* Right Image Column */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-md md:max-w-xl lg:max-w-[90%] bg-surface border-2 border-ink p-2.5 shadow-[8px_8px_0px_0px_var(--color-ink)] hover:shadow-[12px_12px_0px_0px_var(--color-ink)] -rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300 ease-out select-none">
            <Image
              src="/2027/hero.png"
              alt="ICAA 2027 Campus"
              width={800}
              height={533}
              className="w-full h-auto object-cover border border-ink/10 block"
              priority
            />
            {/* Floating Sticker / Tag */}
            <div className="absolute -top-4 -right-4 bg-chrome-400 text-ink text-xs font-mono font-bold px-3 py-1.5 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] rotate-6 uppercase">
              Welcome to
            </div>
            {/* Floating Sticker / Tag at bottom-left */}
            <div className="absolute -bottom-4 -left-4 bg-abyss-500 text-paper text-xs font-mono font-bold px-3 py-1.5 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] -rotate-6 uppercase">
              ICAA 2027!!
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden flex-col px-6 pt-24 pb-12 gap-8 w-full">
        {/* Title & Description */}
        <div className="flex flex-col gap-4 w-full">
          <span className="text-abyss-500 font-mono font-bold text-sm tracking-wider uppercase">
            January 06, 2027 – January 08, 2027
          </span>
          <h1 className="text-3xl font-serif font-bold text-ink leading-tight">
            International Conference on{" "}
            <span className="text-abyss-500">Applied</span>{" "}
            <span className="text-grove-600">Algorithms</span>
          </h1>
          <p className="text-ink-dim/90 font-sans text-sm leading-relaxed text-justify">
            ICAA is a conference series with a mission to provide a high-quality
            forum for researchers working in applied algorithms. It brings
            together academicians, industry professionals, and practitioners to
            exchange ideas, present cutting-edge research, and discuss emerging
            challenges in algorithm design and analysis. The conference fosters
            collaboration and innovation across diverse domains where
            algorithmic solutions play a critical role.{" "}
          </p>
        </div>

        {/* Hero Image in the middle */}
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full max-w-sm bg-surface border-2 border-ink p-2 shadow-[6px_6px_0px_0px_var(--color-ink)] -rotate-1 select-none">
            <Image
              src="/2027/hero.png"
              alt="ICAA 2027 Campus"
              width={800}
              height={533}
              className="w-full h-auto object-cover border border-ink/10 block"
              priority
            />
            {/* Floating Sticker / Tag */}
            <div className="absolute -top-3.5 -right-3.5 bg-chrome-400 text-ink text-[10px] font-mono font-bold px-2 py-1 border border-ink shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] rotate-6 uppercase">
              WELCOME TO
            </div>
            {/* Floating Sticker / Tag at bottom-left */}
            <div className="absolute -bottom-3.5 -left-3.5 bg-abyss-500 text-paper text-[10px] font-mono font-bold px-2 py-1 border border-ink shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] -rotate-6 uppercase">
              ICAA 2027!!
            </div>
          </div>
        </div>

        {/* Two Buttons side-by-side at the bottom */}
        <div className="flex flex-row gap-3 w-full">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-ink bg-chrome-400 text-ink text-xs font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-chrome-600 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer whitespace-nowrap">
            <FaLaptop className="w-4 h-4" />
            <span>In Hybrid Mode</span>
          </button>
          <Link href="/2027/papersubmission" className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-ink bg-sea-500 text-paper text-xs font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-sea-700 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer whitespace-nowrap group">
              <span>Submit Papers</span>
              <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
