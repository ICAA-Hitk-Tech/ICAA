import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
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
    
      <Link href="/2027">
        <button className="group mt-6 flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
          <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
      </Link>
    </div>
  );
}
