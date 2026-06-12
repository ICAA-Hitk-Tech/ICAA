import Link from "next/link";
import { FaArrowLeft, FaCalendarDays, FaClock, FaFileLines } from "react-icons/fa6";
import type { Metadata } from "next";
import { IMPORTANT_DATES, DEADLINE_NOTE, TIMEZONE_INFO } from "@/constants/2027/importantDates";

export const metadata: Metadata = {
  title: "Important Dates",
  description: "Key submission deadlines, notification dates, and camera-ready deadlines for ICAA — plan your research timeline.",
};

export default function ImpDatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-4xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-ink mt-3">
            Important Dates
          </h1>
        </div>

        <div className="hidden md:block shrink-0">
          <Link className="hidden md:block" href="/2027">
            <button className="group flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
              <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Retro Info Banner */}
      <div className="border border-ink bg-surface/30 p-5 shadow-[4px_4px_0px_0px_var(--color-ink)] flex items-start gap-4">
        <div className="w-10 h-10 shrink-0 border border-ink bg-chrome-400 flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_var(--color-ink)]">
          <FaClock className="w-4 h-4 text-ink" />
        </div>
        <div>
          <h4 className="font-serif text-lg font-bold text-ink">
            {DEADLINE_NOTE}
          </h4>
          <p className="font-mono text-xs text-ink-dim/90 mt-1">
            {TIMEZONE_INFO}
          </p>
        </div>
      </div>

      {/* Vertical Timeline Roster */}
      <div className="relative border-l-2 border-ink/50 pl-8 ml-4 sm:ml-6 space-y-10 py-4">
        {IMPORTANT_DATES.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node bullet (diamond) */}
            <div className="absolute -left-11 top-6 w-6 h-6 rotate-45 border border-ink bg-chrome-400 shadow-[2px_2px_0px_0px_var(--color-ink)] transition-transform duration-200 group-hover:scale-110 group-hover:bg-abyss-500" />

            {/* Content card */}
            <article className="p-6 border border-ink bg-surface/40 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-surface hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink">
                  {item.event}
                </h3>
                {item.note && (
                  <span className="inline-block mt-2 font-mono text-[10px] font-bold uppercase tracking-wider bg-abyss-500 text-paper px-2 py-0.5 border border-ink shadow-[1px_1px_0px_0px_var(--color-ink)]">
                    {item.note}
                  </span>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base font-bold text-ink bg-chrome-200 px-4 py-2 border border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-[1.5deg] transition-transform duration-300">
                  <FaCalendarDays className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Actions / Navigation */}
      <div className="flex justify-center border-t-2 border-ink pt-8">
        <Link
          href="/2027/papersubmission"
          className="w-full sm:w-auto flex justify-center"
        >
          <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink bg-abyss-500 text-paper font-bold text-xs uppercase tracking-widest -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-abyss-700 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
            <FaFileLines className="w-3.5 h-3.5" />
            <span>Paper Submission Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
