"use client";

import {
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

interface PlaybackControlsProps {
  pageIndex: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

export default function PlaybackControls({
  pageIndex,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}: PlaybackControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-2 mt-4 z-10 gap-3">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onPrev}
          className="flex items-center justify-center w-8 h-8 border-2 border-ink bg-surface hover:bg-border text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
          aria-label="Previous Page"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center w-8 h-8 border-2 border-ink bg-surface hover:bg-border text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
          aria-label="Next Page"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onTogglePlay}
          className="flex items-center justify-center w-8 h-8 border-2 border-ink bg-surface hover:bg-border text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
          aria-label={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
        >
          {isPlaying ? (
            <FaPause className="w-3.5 h-3.5" />
          ) : (
            <FaPlay className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <div className="font-mono text-xs text-ink-dim text-center">
        Page {pageIndex + 1} of 4
      </div>
    </div>
  );
}
