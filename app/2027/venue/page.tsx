import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { images } from "@/constants/2027/cloudinary_images";
import type { Metadata } from "next";

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
          {/* <span className="font-mono text-xs uppercase tracking-widest text-grove-600 border border-grove-600/30 px-3 py-1 bg-surface">
            Location Info
          </span> */}
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
          <div className="relative shrink-0">
            <div className="border-2 border-ink bg-surface p-4 shadow-[6px_6px_0px_0px_var(--color-ink)] hover:shadow-[8px_8px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200">
              <div className="relative w-20 h-20 md:w-28 md:h-28">
                <Image
                  src={images.heritage}
                  alt="Heritage logo"
                  fill
                  sizes="(max-width: 768px) 5rem, 7rem"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* Floating accent tag */}
            <div className="absolute -top-3.5 -right-3.5 bg-chrome-400 text-ink text-[10px] font-mono font-bold px-2 py-1 border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] rotate-3 uppercase whitespace-nowrap">
              ESTD. 2001
            </div>
          </div>

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
        <div className="border-2 border-ink bg-paper shadow-[6px_6px_0px_0px_var(--color-ink)] w-full max-w-4xl overflow-hidden flex flex-col">
          {/* Retro Window Control Bar */}
          <div className="bg-surface border-b-2 border-ink px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
            </div>
            <span className="text-ink-dim text-[10px] font-bold uppercase tracking-widest font-mono">
              campus_map.gps
            </span>
          </div>

          {/* Map Body (Google Maps Iframe) */}
          <div className="w-full h-112.5 md:h-125 bg-paper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.426210408544!2d88.41431461142512!3d22.518407879440622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0273f58b9feec5%3A0x30f8067b73c45d8!2sThe%20Heritage%20College%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1717800000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map location of The Heritage College, Kolkata"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
