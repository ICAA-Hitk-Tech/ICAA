"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/constants/2027/cloudinary_images";
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
          </div>
          {/* <hr className="border-t-2 border-ink/10 my-1" />

          <div className="flex flex-col-reverse sm:flex-row items-end sm:items-start justify-between gap-4">
            <div className="flex flex-col gap-1 w-full">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-dim/60 font-bold">
                Publication
              </span>
              <p className="font-serif text-base leading-snug text-ink text-justify sm:text-left">
                Proceedings of past ICAA conferences were published as part of
                the{" "}
                <a
                  href="https://link.springer.com/conference/icaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sea-700 hover:text-sea-700/80 font-black underline decoration-2 underline-offset-2 transition-colors duration-150"
                >
                  Springer Verlag LNCS
                </a>{" "}
                volume. Proceedings of ICAA 2027 will also be published by
                Springer.
              </p>
            </div>
            <Image
              src={images.springer}
              alt="Springer Logo"
              width={140}
              height={48}
              className="h-12 w-auto object-contain shrink-0 border border-ink bg-white mt-1 self-end sm:self-auto"
            />
          </div>

          <hr className="border-t-2 border-ink/10 my-1" /> */}
        </div>

        {/* Right Column: Portal Control Card */}
        <div className="flex flex-col justify-start">
          <SubmissionPannel handleSubButtonClick={handleSubButtonClick} />
          {/* Dedicated CMT Platform Capsule */}
          {/* <div className="mt-5 border-2 border-ink bg-surface/40 p-4 shadow-[4px_4px_0px_0px_var(--color-ink)] flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-black text-ink uppercase tracking-wider">
              Platform
            </span>
            <div className="relative w-28 h-8">
              <Image
                src={images.cmt}
                alt="Microsoft CMT Logo"
                fill
                sizes="7rem"
                className="object-contain"
              />
            </div>
          </div> */}
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
            <TopicCard key={i} topic={topic} />
          ))}
        </div>

        {/* <div className="border border-ink bg-surface/40 p-6 shadow-[4px_4px_0px_0px_var(--color-ink)]">
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink-dim">
            Note
          </span>
          <p className="mt-3 text-ink-dim leading-relaxed text-justify">
            The Microsoft CMT service was used for managing the peer-review
            process for this conference. This service was provided for free by
            Microsoft and they bore all expenses, including costs for Azure
            cloud services as well as for software development and support.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PaperSubmissionPage;
