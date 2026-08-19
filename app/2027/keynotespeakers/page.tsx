import type { Metadata } from "next";
import Image from "next/image";
import { KEYNOTE_SPEAKERS } from "@/constants/2027/keynoteSpeakers";
import BackButton from "@/components/2027/BackButton";
import { FaArrowRight } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description:
    "Keynote speakers and invited lecturers at ICAA 2027 — leading researchers presenting cutting-edge work in algorithms and computation.",
};

export default function KeynoteSpeakersPage() {
  const hasSpeakers = KEYNOTE_SPEAKERS.length > 0;

  return (
    <div className="bg-paper text-ink px-4 md:px-6 pt-24 pb-16 max-w-6xl mx-auto flex flex-col gap-10">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center border-b-2 border-ink pb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-ink">
          Keynote Speakers
        </h1>
        <BackButton />
      </div>

      {/* ── Content (n * 2 Grid) ────────────────────────────────────────────── */}
      {hasSpeakers ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEYNOTE_SPEAKERS.map((speaker, idx) => {
            return (
              <article
                key={speaker.name}
                className="group relative border-2 border-ink bg-surface shadow-[2px_2px_0px_0px_var(--color-ink)] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {/* 1. Header Banner */}
                <div className="relative h-32 w-full border-b border-ink bg-surface overflow-hidden">
                  {speaker.bannerImage && (
                    <Image
                      src={speaker.bannerImage}
                      alt={`${speaker.name} Banner`}
                      fill
                      className="object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx < 2}
                    />
                  )}
                  <div className="absolute inset-0 bg-ink/5" />
                </div>

                {/* 2. Overlapping Circular Profile Avatar */}
                <div className="absolute top-14 left-6 w-36 h-36 border-4 border-paper rounded-full bg-white overflow-hidden shadow-[2px_2px_0px_0px_var(--color-ink)] z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes="9rem"
                  />
                </div>

                {/* 3. Details (Pushed down to respect absolute avatar spacing) */}
                <div className="pt-20 pb-6 px-6 flex flex-col gap-4 flex-1 justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="font-sans text-xl font-bold text-ink tracking-tight">
                        {speaker.name}
                      </h2>

                      {/* Headline / Designation */}
                      <p className="font-sans text-sm text-ink leading-snug whitespace-pre-line">
                        {speaker.university.replace(/<br\s*\/?>/gi, "\n")}
                      </p>
                    </div>

                    {/* Talk Section (Simulating LinkedIn experience/talk block) */}
                    {/* Keynote Talk */}
                    {/* Keynote Talk */}
                    {speaker.talkTitle && (
                      <div className="border-t border-ink/15 pt-3">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-dim/70 mb-1.5">
                          Title of the Talk
                        </p>

                        <h4 className="font-serif text-[15px] font-bold leading-snug text-ink">
                          {speaker.talkTitle}
                        </h4>
                      </div>
                    )}
                  </div>

                  {/* Profile Link (Card Ender) */}
                  <div className="pt-3 border-t border-ink/15 flex items-center justify-end w-full mt-auto">
                    <a
                      href={speaker.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2.5"
                    >
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-dim group-hover/link:text-ink transition-colors duration-150">
                        View Profile
                      </span>
                      <div className="flex items-center justify-center w-7 h-7 rounded-full shrink-0">
                        <FaArrowRight className="w-3 h-3 text-ink-dim group-hover/link:text-ink transition-transform duration-150 group-hover/link:translate-x-0.5" />
                      </div>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      {/* More speakers announcement banner */}
          <div className="flex items-center gap-4 max-w-3xl mx-auto w-full border-2 border-ink bg-surface shadow-[3px_3px_0px_0px_var(--color-ink)] px-5 py-4 md:px-6 md:py-5">
            <div className="flex flex-col">
              <p className="font-serif text-sm md:text-base font-bold text-ink">
                More Keynote Speakers Coming Soon
              </p>
              <p className="font-sans text-xs md:text-sm text-ink-dim leading-relaxed">
                Further keynote speakers for ICAA 2027 are being finalised and will be revealed
                shortly. Stay tuned for further updates.
              </p>
            </div>
      </div>
      </>
      ) : (
        <div className="min-h-32 flex flex-col items-center justify-center gap-4 p-8 text-center border-2 border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)]">
          <h3 className="text-2xl font-serif font-bold text-ink">
            To be announced soon!
          </h3>
          <p className="text-ink-dim max-w-sm text-sm">
            Our keynote speakers for ICAA 2027 will be announced shortly. Check back for updates.
          </p>
        </div>
      )}
    </div>
  );
}