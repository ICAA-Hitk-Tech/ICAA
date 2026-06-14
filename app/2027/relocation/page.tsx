"use client";

import { useState } from "react";
import CoverflowGallery from "@/components/2027/relocation/CoverflowGallery";
import { FaPhone } from "react-icons/fa6";
import { HOTELS } from "@/constants/2027/hotels";
import { ATTRACTIONS } from "@/constants/2027/attractions";
import {
  LOCAL_CUISINE_TEXT,
  EMERGENCY_CONTACTS
} from "@/constants/2027/relocation";
import HotelCard from "@/components/2027/relocation/HotelCard";
import MapLayoutCard from "@/components/2027/MapLayoutCard";
import TravelGuidelines from "@/components/2027/relocation/TravelGuidelines";
import BackButton from "@/components/2027/BackButton";

const RelocationPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeHotel = HOTELS[activeIndex];

  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-ink mt-3">
            Travel & Accommodation
          </h1>
        </div>

        <BackButton />
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
                <HotelCard
                  key={index}
                  index={index}
                  hotel={hotel}
                  isActive={isActive}
                  setActiveIndex={setActiveIndex}
                />
              );
            })}
          </div>

          {/* Right: Sticky Map View (Large retro dashboard frame) */}
          <div className="lg:col-span-5 h-96 lg:h-full">
            <MapLayoutCard
              location={activeHotel}
            />
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
      <TravelGuidelines />

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

export default RelocationPage;