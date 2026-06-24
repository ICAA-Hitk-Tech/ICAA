"use client";

import { useState, useEffect, useRef } from "react";
import { PROCEEDINGS_DATA } from "@/constants/2027/proceedings";
import { AnimatePresence } from "framer-motion";
import BackButton from "@/components/2027/BackButton";
import BookCover from "@/components/2027/proceedings/BookCover";
import BookSpread from "@/components/2027/proceedings/BookSpread";
import NavigationTabs from "@/components/2027/proceedings/NavigationTabs";
import PlaybackControls from "@/components/2027/proceedings/PlaybackControls";
import Image from "next/image";
import { images } from "@/constants/2027/cloudinary_images";

export default function ProceedingsPage() {
  const [pageIndex, setPageIndex] = useState(0); // 0 = Cover, 1 = 2026, 2 = 2025, 3 = 2014
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection(1);
      setPageIndex((prev) => (prev + 1) % 4);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePageChange = (index: number) => {
    setIsPlaying(false); // Stop autoplay on manual interaction
    setDirection(index > pageIndex ? 1 : -1);
    setPageIndex(index);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setDirection(1);
    setPageIndex((prev) => (prev + 1) % 4);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setDirection(-1);
    setPageIndex((prev) => (prev - 1 + 4) % 4);
  };

  const currentBook = pageIndex > 0 ? PROCEEDINGS_DATA[pageIndex - 1] : null;

  return (
    <div className="min-h-screen bg-paper text-ink px-4 md:px-6 pt-28 pb-24 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-ink">
            Conference Proceedings
          </h1>
        </div>

        <BackButton />
      </div>

      {/* Main interactive book space */}
      <div
        className={`relative w-full md:w-[calc(100%-56px)] xl:w-full ${pageIndex === 0 ? "max-w-xl" : "max-w-4xl"} mx-auto pt-2 flex flex-col gap-4 md:gap-6 transition-all duration-500 ease-in-out`}
      >
        <NavigationTabs pageIndex={pageIndex} onPageChange={handlePageChange} />

        {/* STATIC BOOK CONTAINER (Does not rotate or spin) */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {pageIndex === 0 ? (
              /* CLOSED COVER VIEW */
              <BookCover onOpen={() => handlePageChange(1)} />
            ) : (
              /* OPEN SPREAD VIEW (No spin on page switch: only inner pages animate) */
              currentBook && (
                <BookSpread
                  currentBook={currentBook}
                  pageIndex={pageIndex}
                  direction={direction}
                />
              )
            )}
          </AnimatePresence>
        </div>

        {/* Playback Controls & Page numbers */}
        <PlaybackControls
          pageIndex={pageIndex}
          isPlaying={isPlaying}
          onPrev={handlePrev}
          onNext={handleNext}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>

      {/* Springer Collaboration Info Section */}
      <div className="border border-ink bg-surface p-6 md:p-8 shadow-[4px_4px_0px_0px_var(--color-ink)] flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-black text-ink">
            Official Springer LNCS Series
          </h2>
          <div className="flex flex-col">
            <p className="text-sm text-ink-dim leading-relaxed text-justify">
              All peer-reviewed papers accepted for presentation at ICAA 2026,
              ICAA 2025, and ICAA 2014 were published in collaboration with
              Springer Verlag within the renowned{" "}
              <strong className="text-ink">
                Lecture Notes in Computer Science (LNCS)
              </strong>{" "}
              series. Volumes are indexed in EI, Scopus, DBLP, and other major
              indices.
            </p>
          </div>
        </div>

        {/* <Image
          src={images.springer}
          alt="Springer Logo"
          width={140}
          height={48}
          className="h-12 w-auto object-contain shrink-0 border border-ink bg-white mt-1 self-end sm:self-auto"
        /> */}
      </div>
    </div>
  );
}
