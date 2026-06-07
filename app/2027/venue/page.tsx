import type { Metadata } from "next";

export const metadata: Metadata = { title: "Venue — ICAA 2027" };

export default function VenuePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 gap-4">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-ghost border border-border px-3 py-1">Venue</span>
      <h1 className="text-4xl font-serif font-bold text-ink text-center">To be announced soon!</h1>
      <p className="text-ink-dim text-center max-w-md">
        Venue details for ICAA 2027 — Heritage Institute of Technology, Kolkata — will be posted here.
      </p>
    </div>
  );
}
