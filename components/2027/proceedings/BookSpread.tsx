"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { YEAR_LINKS } from "@/lib/config";
import { Proceeding } from "@/lib/types";

interface BookSpreadProps {
  currentBook: Proceeding;
  pageIndex: number;
  direction: number;
}

const contentVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -30 : 30,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

export default function BookSpread({
  currentBook,
  pageIndex,
  direction,
}: BookSpreadProps) {
  return (
    <motion.div
      key="spread-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full border border-ink bg-[#faf8f5] shadow-[2px_2px_0px_0px_var(--color-ink)] rounded-lg flex flex-col md:flex-row relative overflow-hidden"
    >
      {/* LEFT PAGE: BOOK COVER */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-surface/30 md:border-r-2 md:border-ink relative min-h-75 md:min-h-115">
        {/* Spine crease highlight on left page right side */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-4 bg-linear-to-l from-black/10 to-transparent pointer-events-none" />

        {/* Animated Inner Page Content (Cover Photo) */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {currentBook && (
              <div className="relative w-full max-w-45 md:max-w-55 aspect-1/1.5 border-2 border-ink shadow-[1px_1px_0px_0px_var(--color-ink)] overflow-hidden bg-paper select-none">
                <Image
                  src={currentBook.image}
                  alt={currentBook.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 180px, 220px"
                  priority
                />
                {/* Spine Crease simulation overlay */}
                <div className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/30 via-black/5 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-4 w-px bg-white/10 pointer-events-none" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CENTER SPINE SEAM (Desktop/Tablet) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.2 bg-ink/30 -translate-x-1/2 z-10 shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]" />

      {/* RIGHT PAGE: DESCRIPTION & DETAILS */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between relative bg-[#faf8f5] min-h-85 md:min-h-115">
        {/* Spine crease highlight on right page left side */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/10 to-transparent pointer-events-none" />

        {/* Animated Inner Page Content (Text Details & Buttons) */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 flex flex-col justify-between"
          >
            {currentBook && (
              <div className="space-y-4 md:space-y-5 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-grove-600 font-bold border border-grove-600/30 px-2.5 py-0.5 bg-surface">
                    Edition {currentBook.year}
                  </span>
                  <span className="font-mono text-xs text-ink-ghost font-bold">
                    {currentBook.volume}
                  </span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl font-black text-ink leading-tight">
                  {currentBook.title}
                </h3>

                <div className="border-t border-b border-border/80 py-2.5 space-y-1.5 text-xs font-mono text-ink-dim">
                  <div>
                    <strong className="text-ink">Series:</strong> Springer LNCS
                  </div>
                  <div>
                    <strong className="text-ink">Editors:</strong> {currentBook.editors}
                  </div>
                </div>

                <p className="text-sm text-ink-dim leading-relaxed">
                  {currentBook.description}
                </p>

                {/* Dual action buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50 mt-auto">
                  <a
                    href={currentBook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-ink bg-surface hover:bg-border text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 text-xs text-center cursor-pointer"
                  >
                    <span>View Publication</span>
                    <FaArrowLeft className="w-3 h-3 rotate-180 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>

                  <a
                    href={YEAR_LINKS[currentBook.year] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-ink bg-surface hover:bg-border text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 text-xs text-center cursor-pointer"
                  >
                    <span>Visit Site</span>
                    <FaArrowLeft className="w-3 h-3 rotate-180 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
