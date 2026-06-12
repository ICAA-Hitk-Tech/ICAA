"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
}

interface CoverflowGalleryProps {
  images: GalleryImage[];
}

export default function CoverflowGallery({ images }: CoverflowGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const wheelCooldown = useRef(false);

  const totalImages = images.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalImages);
  };

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, totalImages]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, totalImages]);

  // Wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldown.current) return;
    const scrollDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(scrollDelta) > 20) {
      wheelCooldown.current = true;
      if (scrollDelta > 0) handleNext();
      else handlePrev();
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 700);
    }
  };

  // Mouse Drag navigation
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 100) {
      if (diff > 0) handlePrev();
      else handleNext();
      setDragStart(e.clientX);
    }
  };

  const handleMouseUp = () => setDragStart(null);

  // Position offset wrapper
  const getWrappedOffset = (index: number) => {
    let diff = index - activeIndex;
    const half = Math.floor(totalImages / 2);
    while (diff > half) diff -= totalImages;
    while (diff < -half) diff += totalImages;
    return diff;
  };

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  return (
    <div
      className="relative w-full flex flex-col justify-between select-none py-8 bg-transparent overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseEnter={() => setIsPlaying(false)}
    >
      {/* Blurred background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-150 h-75 bg-cover bg-center transition-all duration-1000 blur-[120px] opacity-15 scale-110"
          style={{ backgroundImage: `url(${images[activeIndex].url})` }}
        />
      </div>

      {/* 3D Coverflow Container */}
      <div
        className={`relative w-full flex items-center justify-center z-10 ${
          isMobile ? "h-84" : isTablet ? "h-94" : "h-115"
        }`}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <div
          className={`relative flex items-center justify-center ${
            isMobile ? "w-60 h-76" : isTablet ? "w-72 h-88" : "w-85 h-100"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((img, index) => {
            const d = getWrappedOffset(index);
            const isCenter = d === 0;

            // Positioning calculations for neat overlap and 3D angle
            const rotateYValue = isCenter ? 0 : d > 0 ? -45 : 45;
            const xOffset = isCenter
              ? 0
              : d > 0
              ? d * (isMobile || isTablet ? 0 : 135) + (isMobile || isTablet ? 0 : 150)
              : d * (isMobile || isTablet ? 0 : 135) - (isMobile || isTablet ? 0 : 150);
            const zOffset = isCenter ? 150 : -150 - Math.abs(d) * 50;
            const cardScale = isCenter ? 1.05 : 0.82;
            
            // Hide adjacent cards entirely on mobile and tablet to remove background clutter/shadows
            const cardOpacity = isCenter
              ? 1
              : isMobile || isTablet
              ? 0
              : Math.max(0.1, 0.7 - Math.abs(d) * 0.25);
            const cardBlur = isCenter ? "0px" : `${Math.abs(d) * 2}px`;

            return (
              <motion.div
                key={index}
                animate={{
                  rotateY: rotateYValue,
                  x: xOffset,
                  z: zOffset,
                  scale: cardScale,
                  opacity: cardOpacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  width: isMobile ? "240px" : isTablet ? "280px" : "300px",
                  height: isMobile ? "300px" : isTablet ? "340px" : "370px",
                  zIndex: 20 - Math.abs(d),
                  filter: `blur(${cardBlur})`,
                  pointerEvents: isCenter ? "auto" : (isMobile || isTablet) ? "none" : "auto",
                }}
                onClick={(e) => {
                  if (!isCenter) {
                    e.stopPropagation();
                    setActiveIndex(index);
                  }
                }}
                className={`group border-3 border-ink bg-surface overflow-hidden cursor-pointer transition-shadow ${
                  isMobile || isTablet
                    ? "shadow-none"
                    : "shadow-[2px_2px_0px_0px_var(--color-ink)]"
                }`}
              >
                {/* Image layout */}
                <div className="relative w-full h-full bg-white">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes={isMobile ? "240px" : isTablet ? "280px" : "300px"}
                    className="object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
                    priority={isCenter}
                  />

                  {/* Dark shade on unfocused cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-ink/35 transition-opacity duration-300" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Nav Controls & Text Details Container */}
      <div className={`z-10 flex flex-col items-center gap-6 ${isMobile ? "mt-8" : "mt-4"}`}>
        {/* Navigation block */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="group flex items-center justify-center w-10 h-10 border-2 border-ink bg-surface text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-chrome-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
            aria-label="Previous Attraction"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 w-2.5 rotate-45 border-2 border-ink transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "bg-grove-600 scale-125"
                    : "bg-ink/15 hover:bg-ink/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group flex items-center justify-center w-10 h-10 border-2 border-ink bg-surface text-ink font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-chrome-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
            aria-label="Next Attraction"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Central Clean, Fully-Visible Text Block below the slider */}
        <div className="w-full max-w-xl text-center px-6 min-h-22.5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <h4 className="font-serif text-2xl font-black text-ink">
                {images[activeIndex].title}
              </h4>
              <p className="font-sans text-sm text-ink-dim leading-relaxed">
                {images[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
