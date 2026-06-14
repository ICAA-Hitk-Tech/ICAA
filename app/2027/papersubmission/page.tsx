"use client";

import { useState, useEffect } from "react";
import {
  SUBMISSION_INSTRUCTIONS,
  TOPICS_OF_INTEREST,
} from "@/constants/2027/paperSubmission";
import BackButton from "@/components/2027/BackButton";
import CustomToast from "@/components/2027/CustomToast";
import SubmissionPannel from "@/components/2027/paper_submission/SubmissionPannel";
import TopicCard from "@/components/2027/paper_submission/TopicCard";

const PaperSubmissionPage = () => {
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
        <CustomToast
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
            Paper Submission
          </h1>
        </div>

        <BackButton />
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
                {SUBMISSION_INSTRUCTIONS.guidelines.map((guide, idx) => {
                  const g = guide as { label?: string; desc?: string };

                  return (
                    <div
                      key={idx}
                      className="flex gap-3 items-start bg-surface/40 p-4 border border-border shadow-sm hover:border-ink-ghost transition-colors duration-150"
                    >
                      <span className="w-2.5 h-2.5 bg-grove-600 border border-ink rotate-45 shrink-0 mt-1.5" />
                      <div className="text-sm leading-normal">
                        {g.label ? (
                          <span className="font-bold text-ink font-mono">
                            {g.label}:
                          </span>
                        ) : null}{" "}
                        {g.desc ? (
                          <span className="text-ink-dim">{g.desc}</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Portal Control Card */}
        <div className="flex flex-col justify-start">
          <SubmissionPannel
            handleSubButtonClick={handleSubButtonClick}
          />
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
            <TopicCard
              key={i}
              topic={topic}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaperSubmissionPage;