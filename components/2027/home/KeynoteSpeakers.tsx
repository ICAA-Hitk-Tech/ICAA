import Image from "next/image";
import Link from "next/link";
import { KEYNOTE_SPEAKERS } from "../../../constants/2027/keynoteSpeakers";
import { FaArrowRight } from "react-icons/fa6";

const KeynoteSpeakers = () => {
  const hasSpeakers = KEYNOTE_SPEAKERS.length > 0;

  return (
    <section className="w-full px-4 md:px-10 py-16 bg-paper text-ink max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-serif text-4xl md:text-5xl font-black text-ink text-center leading-tight">
          Confirmed Invited Speakers
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 w-16 bg-abyss-500 border border-ink" />
          <div className="h-1 w-3 bg-chrome-400 border border-ink" />
        </div>
      </div>

      {hasSpeakers ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-xs sm:max-w-sm md:max-w-6xl mx-auto w-full">
            {KEYNOTE_SPEAKERS.map((speaker) => (
              <Link
                key={speaker.name}
                href={speaker.profileUrl}
                className="block group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <article className="h-full flex flex-col border border-ink bg-surface shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                  {/* Full-bleed photo — stays 1:1, just scales with the card */}
                  <div className="relative w-full aspect-square border-b border-ink bg-ink/5 overflow-hidden">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Text block — tighter padding/type on mobile */}
                  <div className="flex flex-col gap-1 md:gap-1.5 px-4 py-3 md:px-6 md:py-5">
                    <h3 className="font-serif text-base md:text-xl font-bold text-ink leading-snug">
                      {speaker.name}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-ink-dim leading-relaxed">
                      {speaker.university}
                    </p>

                    {/* Arrow tied to a label, not floating alone */}
                    <div className="mt-2 pt-2 md:mt-4 md:pt-3 border-t border-ink/15 flex items-center justify-between">
                      <span className="font-sans text-[10px] md:text-xs font-semibold tracking-wide uppercase text-ink-dim group-hover:text-ink transition-colors">
                        View Profile
                      </span>
                      <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full">
                        <FaArrowRight className="w-3 h-3 text-ink-dim group-hover:text-ink-dim transition-all duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* More speakers announcement banner */}
          <div className="flex items-center gap-4 max-w-3xl mx-auto w-full border-2 border-ink bg-surface shadow-[3px_3px_0px_0px_var(--color-ink)] px-5 py-4 md:px-6 md:py-5">
            <div className="flex flex-col">
              <p className="font-serif text-sm md:text-base font-bold text-ink">
                More Keynote Speakers Coming Soon
              </p>
              <p className="font-sans text-xs md:text-sm text-ink-dim leading-relaxed">
                Additional keynote speakers for ICAA 2027 are being finalised
                and will be revealed shortly. Stay tuned for further updates.
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
            Our keynote speakers for ICAA 2027 will be announced shortly. Check
            back for updates.
          </p>
        </div>
      )}
    </section>
  );
};

export default KeynoteSpeakers;
