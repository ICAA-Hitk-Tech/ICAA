import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import type { Metadata } from "next";
import { venue } from "@/constants/2027/venue";
import MapLayoutCard from "@/components/2027/MapLayoutCard";
import HeritageBadge from "@/components/2027/HeritageBadge";
import BackButton from "@/components/2027/BackButton";


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

        <BackButton/>
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
