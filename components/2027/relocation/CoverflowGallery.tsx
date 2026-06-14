"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { DeviceType, GalleryImage } from "@/lib/types";
import { CARD, SIDE_SPREAD } from "@/constants/2027/attractions";
import CoverflowImage from "./CoverflowImage";
import {
  getDeviceType,
  getOffset,
  getCardTransform,
  getContainerHeight,
  getArrowClasses,
  getGlowStyle,
  handleWheelEvent,
  handleMouseDrag,
} from "@/utils/2027/attractionUtils";

interface CoverflowGalleryProps {
  images: GalleryImage[];
}

const CoverflowGallery = ({ images }: CoverflowGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const wheelCooldown = useRef(false);

  const totalImages = images.length;
  const handlePrev = () =>
    setActiveIndex((p) => (p - 1 + totalImages) % totalImages);
  const handleNext = () => setActiveIndex((p) => (p + 1) % totalImages);

  // Breakpoint detection
  useEffect(() => {
    const onResize = () => setDeviceType(getDeviceType(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, totalImages]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(handleNext, 2000);
    return () => clearInterval(id);
  }, [isPlaying, activeIndex, totalImages]);

  // Derived display values
  const bp = deviceType;
  const card = CARD[bp];
  const spread = SIDE_SPREAD[bp];
  const containerH = getContainerHeight(bp);
  const { arrowCls, iconCls } = getArrowClasses(bp);

  return (
    <div
      className="relative w-full flex flex-col select-none py-8 bg-transparent overflow-hidden"
      onWheel={(e) => handleWheelEvent(e, wheelCooldown, handleNext, handlePrev)}
      onMouseDown={(e) => setDragStart(e.clientX)}
      onMouseMove={(e) => {
        if (dragStart === null) return;
        setDragStart(handleMouseDrag(e.clientX, dragStart, handlePrev, handleNext));
      }}
      onMouseUp={() => setDragStart(null)}
      onMouseLeave={() => {
        setDragStart(null);
        setIsPlaying(true);
      }}
      onMouseEnter={() => setIsPlaying(false)}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto bg-cover bg-center transition-all duration-1000 blur-[120px] scale-110"
          style={getGlowStyle(bp, images[activeIndex].url)}
        />
      </div>

      <div
        className="relative w-full flex items-center justify-center z-10"
        style={{
          height: containerH,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Stage arrows — mobile & tablet only */}
        {bp !== "desktop" && (
          <>
            <button
              onClick={handlePrev}
              className={`absolute left-3 z-30 ${arrowCls}`}
              aria-label="Previous"
            >
              <FaChevronLeft className={iconCls} />
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-3 z-30 ${arrowCls}`}
              aria-label="Next"
            >
              <FaChevronRight className={iconCls} />
            </button>
          </>
        )}

        {/* Card stack */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: card.w, height: card.h, transformStyle: "preserve-3d" }}
        >
          {images.map((img, index) => {
            const d = getOffset(index, activeIndex, totalImages);
            const isCenter = d === 0;
            const { xOffset, rotateY, zOffset, scale, opacity, cardBlur } =
              getCardTransform(d, card, spread);

            return (
              <CoverflowImage
                key={index}
                index={index}
                rotateY={rotateY}
                xOffset={xOffset}
                zOffset={zOffset}
                scale={scale}
                opacity={opacity}
                card={card}
                cardBlur={cardBlur}
                d={d}
                isCenter={isCenter}
                setActiveIndex={setActiveIndex}
                img={img}
              />
            );
          })}
        </div>
      </div>

      <div className="z-10 flex flex-col items-center gap-5 mt-6">
        {/*
          Desktop: arrows flank the dots here in the bottom row.
          Mobile + Tablet: dots only — arrows already live in the stage above.
        */}
        <div className="flex items-center gap-4">
          {bp === "desktop" && (
            <button onClick={handlePrev} className={arrowCls} aria-label="Previous">
              <FaChevronLeft className={iconCls} />
            </button>
          )}

          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 w-1.5 rotate-45 border transition-all duration-300 cursor-pointer ${i === activeIndex
                  ? "bg-grove-600 border-grove-600 scale-110"
                  : "bg-ink/10 border-ink/20 hover:bg-ink/25 hover:border-ink/45"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {bp === "desktop" && (
            <button onClick={handleNext} className={arrowCls} aria-label="Next">
              <FaChevronRight className={iconCls} />
            </button>
          )}
        </div>

        {/* Title + description */}
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

export default CoverflowGallery;