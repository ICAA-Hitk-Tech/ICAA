"use client";

import Link from "next/link";
import { useState } from "react";
import { ANNOUNCEMENTS } from "@/constants/2027/announcements";
import { FaArrowRight } from "react-icons/fa6";
import { BiCalendar } from "react-icons/bi";

const Announcements = () => {
  const announcementCount = ANNOUNCEMENTS.length;
  const itemsPerPage = 2;
  const totalPages = Math.ceil(announcementCount / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="w-full px-6 sm:px-10 py-8 bg-paper">
      <div className="max-w-6xl mx-auto">
        {/* Center-aligned Section Header */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight">
            Announcements
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-0.75 w-16 bg-abyss-500 animate-pulse" />
            <div className="h-0.75 w-3 bg-chrome-400" />
          </div>
        </div>

        {announcementCount > 0 ? (
          <div>
            {/* Unified Carousel for both Mobile and Desktop */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(-${currentPage * 100}%, 0, 0)`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <div
                    key={`page-${pageIdx}`}
                    className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6 p-2"
                  >
                    {ANNOUNCEMENTS.slice(
                      pageIdx * itemsPerPage,
                      (pageIdx + 1) * itemsPerPage
                    ).map((a, idx) => (
                      <article
                        key={`announcement-${a.date}-${idx}`}
                        className="group flex flex-col justify-between h-full p-6 border border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                      >
                        <div>
                          <span className="inline-block font-serif text-sm font-black tracking-wider uppercase bg-chrome-400 text-ink px-3 py-1.5 border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-[1.5deg] transition-transform duration-300">
                            {a.date}
                          </span>
                          <h3 className="font-serif text-xl font-black text-ink leading-snug mt-4">
                            {a.header}
                          </h3>
                          <p className="font-sans text-sm text-ink-dim/95 leading-relaxed mt-2">
                            {a.desc}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls & Pagination (Visible on all screen views when total pages > 1) */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                {/* Arrows */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="group flex items-center justify-center w-12 h-12 border-2 border-ink bg-surface text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-border hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
                    aria-label="Previous announcements"
                  >
                    <span className="text-xl" aria-hidden="true">
                      ←
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="group flex items-center justify-center w-12 h-12 border-2 border-ink bg-surface text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-border hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
                    aria-label="Next announcements"
                  >
                    <span className="text-xl" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentPage(i)}
                      className={`h-2 w-2 rotate-45 border-2 border-ink transition-all duration-300 cursor-pointer ${
                        i === currentPage
                          ? "bg-grove-600 scale-125"
                          : "bg-ink/10 hover:bg-ink/30"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Centralized View All Button at the bottom */}
            <div className="mt-10 flex justify-center">
              <Link href="/2027/impdates">
                <button className="group flex items-center relative px-8 py-3 border border-ink bg-surface text-ink font-mono font-bold text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer hover:bg-border shadow-[2px_2px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none">
                  <BiCalendar className="w-5 h-5 mr-2" />
                  <span>View All Important Dates</span>
                  <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="min-h-32 flex flex-col items-center justify-center gap-4 p-8 text-center border-3 border-ink bg-surface shadow-[6px_6px_0px_0px_var(--color-ink)]">
            <h3 className="text-3xl font-serif font-black text-ink">
              To be announced soon!
            </h3>
            <p className="text-ink/70 max-w-sm">
              Key deadlines for ICAA 2027 will be listed here shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
