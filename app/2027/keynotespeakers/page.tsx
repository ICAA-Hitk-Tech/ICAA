import type { Metadata } from "next";

export const metadata: Metadata = { title: "Keynote Speakers — ICAA 2027" };

export default function KeynoteSpeakersPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 gap-4">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-ghost border border-border px-3 py-1">Keynote Speakers</span>
      <h1 className="text-4xl font-serif font-bold text-ink text-center">To be announced soon!</h1>
      <p className="text-ink-dim text-center max-w-md">
        Our keynote speakers for ICAA 2027 will be announced shortly. Check back for updates.
      </p>
    </div>
  );
}
