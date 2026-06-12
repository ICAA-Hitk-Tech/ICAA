import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call for Papers",
  description:
    "Submit your research contributions to ICAA 2027 and join us in advancing the field of computer science.",
};

export default function CallForPapersPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 gap-4">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-ghost border border-border px-3 py-1">
        Call for Papers
      </span>
      <h1 className="text-4xl font-serif font-bold text-ink text-center">
        Submit Your Research
      </h1>
      <p className="text-ink-dim text-center max-w-md">
        We invite you to submit your original research contributions to ICAA 2027.
        Your work will be evaluated by a panel of experts, and selected papers will be presented at the conference.
        review process.
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
