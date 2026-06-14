"use client";

import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  return (
    <motion.div
      key="cover-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      className="w-full max-w-xl mx-auto border-4 border-ink bg-grove-950 text-paper p-6 md:p-12 shadow-[10px_10px_0px_0px_var(--color-ink)] cursor-pointer hover:shadow-[14px_14px_0px_0px_var(--color-ink)] hover:-translate-y-1 transition-all duration-300 rounded-r-lg rounded-l-md flex flex-col items-center justify-between min-h-120 md:min-h-130 relative overflow-hidden"
    >
      {/* Book Texture Overlay (Subtle noise/gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-black/40 pointer-events-none" />

      {/* Realistic Spine Creasing */}
      <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0.5 w-0.5 bg-white/20 pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-10 w-0.5 bg-black/40 pointer-events-none z-10 shadow-[1px_0_2px_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-y-0 left-11 w-px bg-white/10 pointer-events-none z-10" />

      {/* Elegant Double Frame Borders (shifted right to avoid spine) */}
      <div className="absolute inset-y-4 right-4 left-14 border border-gamboge/20 pointer-events-none rounded-sm z-10" />
      <div className="absolute inset-y-6 right-6 left-16 border-2 border-gamboge/40 pointer-events-none rounded-sm z-10" />

      {/* Corner Ornaments */}
      <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-gamboge/50 rounded-full z-10" />
      <div className="absolute top-8 left-18 w-1.5 h-1.5 bg-gamboge/50 rounded-full z-10" />
      <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-gamboge/50 rounded-full z-10" />
      <div className="absolute bottom-8 left-18 w-1.5 h-1.5 bg-gamboge/50 rounded-full z-10" />

      <div className="w-full flex flex-col items-center text-center mt-10 z-20 pl-6">
        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-chrome-200 font-semibold mb-6 border-b border-gamboge/30 pb-2">
          Academic Series
        </span>
        <h2 className="font-serif text-5xl md:text-6xl font-black text-gamboge leading-tight tracking-wide drop-shadow-[0px_3px_5px_rgba(0,0,0,0.6)]">
          ICAA
        </h2>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-paper/90 tracking-widest mt-4">
          Proceedings Archive
        </h3>
        <div className="w-24 h-0.75 bg-gamboge my-8 shadow-[0px_2px_4px_rgba(0,0,0,0.5)]" />
        <p className="text-xs md:text-sm font-mono text-paper/60 uppercase tracking-[0.15em] mt-2">
          Volumes: 2014 • 2025 • 2026
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-5 z-20 mb-4 pl-6">
        <span className="font-mono text-[10px] md:text-xs text-paper/40 uppercase tracking-widest">
          Published in Springer LNCS
        </span>
        <button className="flex items-center gap-3 px-6 py-3 border-2 border-gamboge bg-gamboge text-grove-950 font-black hover:bg-chrome-200 hover:border-chrome-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm shadow-[0px_4px_10px_rgba(0,0,0,0.5)]">
          <span>Open Proceedings Book</span>
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
