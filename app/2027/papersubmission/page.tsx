"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCircleInfo,
  FaXmark,
  FaPaperPlane,
} from "react-icons/fa6";
import {
  SUBMISSION_INSTRUCTIONS,
  TOPICS_OF_INTEREST,
} from "@/constants/2027/paperSubmission";

export default function PaperSubmissionPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubButtonClick = () => {
    setToastMessage("Paper submission to open soon.");
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-7xl mx-auto flex flex-col gap-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="flex items-center gap-3 px-5 py-4 border-2 border-ink bg-chrome-200 text-ink font-bold shadow-[4px_4px_0px_0px_var(--color-ink)] max-w-sm">
            <FaCircleInfo className="w-5 h-5 text-ink shrink-0" />
            <span className="text-sm font-mono tracking-wide">
              {toastMessage}
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-auto hover:text-destructive transition-colors focus:outline-none cursor-pointer"
              aria-label="Close notification"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          {/* <span className="font-mono text-xs uppercase tracking-widest text-grove-600 border border-grove-600/30 px-3 py-1 bg-surface">
            Call for Papers
          </span> */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
            Paper Submission
          </h1>
        </div>

        <div className="hidden md:block">
          <Link href="/2027">
            <button className="group flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
              <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Submission Instructions & Portal Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Instructions */}
        <div className="lg:col-span-2 flex flex-col gap-6 max-w-3xl">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink">
            Submission Instructions
          </h2>
          <div className="prose prose-ink max-w-none text-ink-dim/95 leading-relaxed space-y-5">
            {SUBMISSION_INSTRUCTIONS.paragraphs.map((para, idx) => (
              <p key={idx} className="text-justify">
                {para}
              </p>
            ))}

            {SUBMISSION_INSTRUCTIONS.guidelines.length > 0 && (
              <div className="space-y-3 mt-6">
                {SUBMISSION_INSTRUCTIONS.guidelines.map((guide, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start bg-surface/40 p-4 border border-border shadow-sm hover:border-ink-ghost transition-colors duration-150"
                  >
                    <span className="w-2.5 h-2.5 bg-grove-600 border border-ink rotate-45 shrink-0 mt-1.5" />
                    <div className="text-sm leading-normal">
                      <span className="font-bold text-ink font-mono">
                        {guide.label}:
                      </span>{" "}
                      <span className="text-ink-dim">{guide.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Portal Control Card */}
        <div className="flex flex-col justify-start">
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)] flex flex-col overflow-hidden">
            {/* Retro Window Control Bar */}
            <div className="bg-surface border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
                <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
                <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
              </div>
              <span className="text-ink-dim text-[10px] font-bold uppercase tracking-widest font-mono">
                portal_status.log
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 bg-paper/30 flex flex-col gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gamboge animate-pulse border border-ink/20" />
                  <h3 className="font-serif text-lg font-bold text-ink leading-tight">
                    Opening Soon
                  </h3>
                </div>
                <p className="text-xs text-ink-dim leading-relaxed font-mono">
                  The portal is currently offline. Authors are requested to
                  prepare their manuscripts in accordance with the paper
                  formatting guidelines before submissions open.
                </p>
              </div>

              <button
                onClick={handleSubButtonClick}
                className="group w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-ink bg-abyss-500 text-paper font-bold uppercase tracking-wider text-xs -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-abyss-700 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
              >
                <span>Submit your Paper</span>
                <FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topics of Interest Section */}
      <div className="flex flex-col gap-8 border-t-2 border-ink pt-12">
        <div className="space-y-3">
          <h2 className="font-serif text-3xl font-bold text-ink">
            Topics of Interest
          </h2>
          <p className="text-ink-dim max-w-3xl leading-relaxed">
            We solicit contributions covering various areas including but not
            limited to the following topics:
          </p>
        </div>

        {/* Unified Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TOPICS_OF_INTEREST.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-2 border-ink bg-paper p-4 shadow-[2px_2px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-surface transition-all duration-150 cursor-default"
            >
              <span className="w-2 h-2 bg-grove-600 border border-ink rotate-45 shrink-0" />
              <span className="font-bold text-sm tracking-wide text-ink font-mono leading-tight">
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
