"use client";

import { useState } from "react";
import Link from "next/link";
import { images } from "@/constants/2027/cloudinary_images";
import CoverflowGallery from "@/components/2027/relocation/CoverflowGallery";
import Image from "next/image";
import { FaArrowLeft, FaPhone, FaGlobe, FaLocationDot, FaEnvelope, FaMapLocationDot } from "react-icons/fa6";
import { HOTELS } from "@/constants/2027/hotels";
import { ATTRACTIONS } from "@/constants/2027/attractions";
import {
  DISCLAIMER_ACCOMMODATION,
  TRAVEL_CLOSING_TEXT,
  LOCAL_CUISINE_TEXT,
  EMERGENCY_CONTACTS
} from "@/constants/2027/relocation";

export default function RelocationPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeHotel = HOTELS[activeIndex];

  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-ink mt-3">
            Travel & Relocation
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

      {/* Main Interactive Accommodation Area */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-grove-600 font-bold">
            Lodging Directory
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-ink leading-tight mt-1">
            Recommended Accommodations
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.75 w-16 bg-abyss-500" />
            <div className="h-0.75 w-3 bg-chrome-400" />
          </div>
        </div>

        {/* 2-Column Split: List on Left, Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Hotels List */}
          <div className="lg:col-span-7 space-y-6">
            {HOTELS.map((hotel, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col sm:flex-row border border-ink bg-surface/30 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "shadow-[4px_4px_0px_0px_var(--color-ink)] bg-surface border-grove-600 -translate-x-0.5 -translate-y-0.5"
                      : "shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-surface/50 hover:shadow-[5px_5px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative w-full sm:w-48 h-44 sm:h-auto border-b-2 sm:border-b-0 sm:border-r-2 border-ink overflow-hidden bg-white shrink-0">
                    <Image
                      src={hotel.image}
                      alt={`${hotel.name} building`}
                      fill
                      sizes="(max-width: 640px) 100vw, 12rem"
                      className="object-cover transition-transform duration-300"
                      priority={index === 0}
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-lg font-black text-ink leading-tight">
                          {hotel.name}
                        </h3>
                        {isActive && (
                          <span className="font-mono text-[9px] uppercase font-bold text-grove-600 border border-grove-600/30 px-2 py-0.5 bg-grove-600/10">
                            Viewing Location
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 text-xs font-sans text-ink-dim">
                        <div className="flex items-start gap-2">
                          <FaLocationDot className="w-3.5 h-3.5 text-ink-dim shrink-0 mt-0.5" />
                          <span>{hotel.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="w-3.5 h-3.5 text-ink-dim shrink-0" />
                          <a
                            href={`tel:${hotel.phone}`}
                            className="font-mono hover:underline hover:text-grove-600 transition-colors duration-150"
                            onClick={(e) => e.stopPropagation()} // prevent switching tab map view on phone click
                          >
                            {hotel.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Show Map Indicator */}
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 border border-ink font-mono font-bold text-[10px] uppercase tracking-wider transition-colors duration-150 shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] ${
                          isActive
                            ? "bg-abyss-500 text-paper"
                            : "bg-paper text-ink hover:bg-ink/5"
                        }`}
                      >
                        <FaMapLocationDot className="w-3.5 h-3.5" />
                        <span>Map Location</span>
                      </button>

                      {/* Website CTA */}
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // prevent switching tab state
                        className="group flex items-center gap-1.5 px-3.5 py-1.5 border border-ink bg-paper text-ink font-mono font-bold text-[10px] uppercase tracking-wider hover:bg-chrome-400 transition-colors duration-150 shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] active:translate-y-0 active:shadow-none"
                      >
                        <FaGlobe className="w-3 h-3" />
                        <span>Visit</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Map View (Large retro dashboard frame) */}
          <div className="lg:col-span-5 lg:h-full">
            <div className="border border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)] overflow-hidden flex flex-col h-95 lg:h-full">
              {/* Window control bar */}
              <div className="bg-surface border-b-2 border-ink px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
                  <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
                </div>
                <span className="text-ink font-bold text-[10px] uppercase tracking-widest font-mono truncate max-w-50">
                  {activeHotel.name.toLowerCase().replace(/\s+/g, "_")}.map
                </span>
              </div>

              {/* Map body */}
              <div className="flex-1 bg-paper relative">
                <iframe
                  src={activeHotel.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Map location of ${activeHotel.name}`}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Attractions Section */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-grove-600 font-bold">
            Explore Kolkata
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-ink leading-tight mt-1">
            Local Attractions
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.75 w-16 bg-abyss-500" />
            <div className="h-0.75 w-3 bg-chrome-400" />
          </div>
        </div>

        <CoverflowGallery images={ATTRACTIONS} />
      </section>

      {/* Travel Guidelines & Assistance (Unified Card) */}
      <section className="border border-ink bg-surface/30 p-8 shadow-[4px_4px_0px_0px_var(--color-ink)] space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-grove-600 font-bold">
            Travel Guidelines
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-ink leading-tight mt-1">
            Important Information & Visa Assistance
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.75 w-16 bg-abyss-500" />
            <div className="h-0.75 w-3 bg-chrome-400" />
          </div>
        </div>

        <div className="space-y-5 text-sm md:text-base leading-relaxed text-ink/95">
          <div className="flex gap-3 items-start">
            <span className="w-2.5 h-2.5 bg-grove-600 border border-ink rotate-45 shrink-0 mt-1.5" />
            <p className="text-justify font-sans">
              <strong>Accommodation Info:</strong>{" "}
              {DISCLAIMER_ACCOMMODATION.replace(
                "Various accommodation options, including hotels, guest houses, and serviced apartments, are available within 2-4 kilometers of the conference venue, catering to different budgets. For assistance, please contact our help desk.",
                "",
              )}
              Various accommodation options, including hotels, guest houses, and
              serviced apartments, are available within 2-4 kilometers of the
              conference venue, catering to different budgets.
            </p>
          </div>

          <div className="flex gap-3 items-start p-4 bg-chrome-200/50 border border-ink shadow-[2.5px_2.5px_0px_0px_var(--color-ink)]">
            <span className="w-2.5 h-2.5 bg-abyss-500 border border-ink rotate-45 shrink-0 mt-1" />
            <p className="text-justify font-sans text-sm text-ink/90">
              <strong className="font-mono text-xs uppercase tracking-widest text-abyss-600 block mb-1">
                Visa & Travel Support
              </strong>
              International participants with accepted papers who require travel
              and visa assistance are encouraged to notify the organizers at the
              help desk as early as possible.
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-2.5 h-2.5 bg-chrome-400 border border-ink rotate-45 shrink-0 mt-1.5" />
            <p className="text-justify font-sans">
              {TRAVEL_CLOSING_TEXT} For any further assistance or travel
              planning queries, feel free to get in touch.
            </p>
          </div>
        </div>

        {/* Central Mail-to Option button */}
        <div className="pt-2 flex justify-center">
          <a
            href="mailto:icaa@heritageit.edu"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-ink bg-chrome-400 text-ink font-mono font-bold text-xs uppercase tracking-widest hover:bg-paper transition-all duration-150 shadow-[3px_3px_0px_0px_var(--color-ink)] hover:shadow-[5px_5px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none text-center"
          >
            <FaEnvelope className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Email Conference Help Desk</span>
          </a>
        </div>
      </section>

      {/* Local Cuisine & Emergency Contacts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-ink pt-12">
        {/* Local Cuisine */}
        <div className="flex flex-col gap-4 p-6 border border-ink bg-surface/30 shadow-[2px_2px_0px_0px_var(--color-ink)] justify-between">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink leading-tight text-center">
              Local Cuisine
            </h2>
            <p className="font-sans text-sm text-ink-dim leading-relaxed text-justify">
              {LOCAL_CUISINE_TEXT}
            </p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="flex flex-col gap-6 p-6 border border-ink bg-surface/30 shadow-[2px_2px_0px_0px_var(--color-ink)] items-center">
          <h2 className="font-serif text-2xl font-bold text-ink leading-tight text-center">
            Emergency Contacts
          </h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full max-w-xs justify-center pt-2">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <a
                  href={`tel:${contact.number}`}
                  className="flex items-center justify-center gap-1.5 px-4 py-1.5 border border-ink bg-paper rounded-full text-sm font-mono font-bold text-ink shadow-[1px_1px_0px_0px_var(--color-ink)] hover:bg-border hover:shadow-[2px_2px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
                >
                  <FaPhone className="w-3 h-3 text-ink/70" />
                  <span>{contact.number}</span>
                </a>
                <span className="font-sans text-xs text-ink-dim font-bold text-center">
                  {contact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
