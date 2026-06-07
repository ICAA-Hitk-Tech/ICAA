import Image from "next/image";
import { FaMicrophone } from "react-icons/fa";
import { KEYNOTE_SPEAKERS } from "../../../constants/2027/keynoteSpeakers";

const KeynoteSpeakers = () => {
  const hasSpeakers = KEYNOTE_SPEAKERS.length > 0;

  return (
    <section className="w-full px-10 py-8">
      <div className="flex flex-col items-center gap-3 mb-2">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink text-center leading-tight">
          Keynote Speakers
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-0.75 w-16 bg-abyss-500" />
          <div className="h-0.75 w-3 bg-chrome-400" />
        </div>
      </div>

      {hasSpeakers ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {KEYNOTE_SPEAKERS.map((speaker) => (
            <article
              key={speaker.name}
              className="group flex flex-col items-center gap-4 border-2 border-ink bg-surface p-6 shadow-[5px_5px_0px_0px_var(--color-ink)] hover:shadow-[7px_7px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-ink bg-white">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 8rem, 10rem"
                  className="object-cover"
                />
              </div>

              <div className="text-center">
                <p className="font-serif text-xl font-bold text-ink">
                  {speaker.name}
                </p>
                <p className="font-sans text-sm text-ink-dim mt-1">
                  {speaker.university}
                </p>
              </div>

              <a
                href={speaker.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border-2 border-ink px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                View Profile
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="min-h-30 flex flex-col items-center justify-center gap-4 p-10 text-center">
          <h3 className="text-4xl font-serif font-bold text-ink">
            To be announced soon!
          </h3>
          <p className="text-ink-dim max-w-md">
            Our keynote speakers for ICAA 2027 will be announced shortly. Check
            back for updates.
          </p>
        </div>
      )}
    </section>
  );
};

export default KeynoteSpeakers;
