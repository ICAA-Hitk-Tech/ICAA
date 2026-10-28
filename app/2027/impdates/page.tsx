import Link from "next/link";
import { FaFileLines, FaCalendarDays } from "react-icons/fa6";
import type { Metadata } from "next";
import { IMPORTANT_DATES } from "@/constants/2027/importantDates";
import BackButton from "@/components/2027/BackButton";
import TimelineCard from "@/components/2027/impdates/TimelineCard";

export const metadata: Metadata = {
  title: "Important Dates",
  description: "Key submission deadlines, notification dates, and camera-ready deadlines for ICAA — plan your research timeline.",
};

const ImpDatesPage = () => {
  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-4xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-ink mt-3">
            Important Dates
          </h1>
        </div>

        <BackButton />
      </div>

      {/* Timeline Overview Banner */}
      <div className="-mt-4 border border-ink bg-surface p-4 sm:p-5 shadow-[4px_4px_0px_0px_var(--color-ink)] flex items-start sm:items-center gap-3.5 sm:gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 border border-ink bg-chrome-400 flex items-center justify-center text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] mt-0.5 sm:mt-0">
          <FaCalendarDays className="w-4 h-4 text-ink" />
        </div>
        <div className="space-y-1 sm:space-y-0.5">
          <h2 className="font-serif text-lg font-bold text-ink leading-snug">
            Conference Deadlines
          </h2>
          <p className="font-mono text-xs text-ink-dim leading-relaxed">
            Track key submission phases, author registration windows, and conference dates below.
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
            <TimelineCard
              key={idx}
              item={item}
            />
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

export default ImpDatesPage;