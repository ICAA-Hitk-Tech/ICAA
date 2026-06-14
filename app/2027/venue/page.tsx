import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { images } from "@/constants/2027/cloudinary_images";
import type { Metadata } from "next";
import { venue } from "@/constants/2027/venue";
import MapLayoutCard from "@/components/2027/MapLayoutCard";
import HeritageBadge from "@/components/2027/HeritageBadge";

export const metadata: Metadata = {
  title: "Venue",
  description:
    "Conference venue at Heritage Institute of Technology, Kolkata — campus location, directions, and interactive map.",
};

export default function VenuePage() {
  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-7xl mx-auto flex flex-col gap-12 relative">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
            Conference Venue
          </h1>
        </div>

        <Link className="hidden md:block" href="/2027">
          <button className="group flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
            <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center gap-12 w-full">
        {/* Centered Identity Strip (Mirrors OrganizedBy styling) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-4xl mx-auto">
          <HeritageBadge />

          <div className="text-center md:text-left space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-tight">
              Heritage Institute of Technology, Kolkata
            </h2>
            <p className="font-mono text-xs md:text-lg text-ink-dim tracking-wide max-w-xl leading-relaxed">
              994 Madurdaha, Chowbaga Road, Anandapur PO:East Kolkata Township,
              Kolkata 700107{" "}
            </p>
          </div>
        </div>

        {/* Map Window Container */}
        <div className="w-full max-w-4xl">
          <MapLayoutCard
            location={venue}
            className="h-124.5 md:h-137"
          />
        </div>
      </div>
    </div>
  );
}
