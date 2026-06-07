import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paper Submission — ICAA 2027" };

export default function PaperSubmissionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 gap-4">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-ghost border border-border px-3 py-1">Paper Submission</span>
      <h1 className="text-4xl font-serif font-bold text-ink text-center">To be announced soon!</h1>
      <p className="text-ink-dim text-center max-w-md">
        Submission guidelines and the link to the submission portal for ICAA 2027 will appear here.
      </p>
    </div>
  );
}
