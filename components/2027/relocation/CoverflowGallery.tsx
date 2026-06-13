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

// ─── Per-breakpoint card dimensions ──────────────────────────────────────────
const CARD = {
  mobile: { w: 200, h: 260 },
  tablet: { w: 240, h: 300 },
  desktop: { w: 300, h: 370 },
} as const;

// Side-card x spacing from centre card edge (px)
const SIDE_SPREAD = {
  mobile: 130,
  tablet: 160,
  desktop: 200,
} as const;

// Arrow button shared base classes — size injected per breakpoint
const ARROW_BASE =
  "flex items-center justify-center border-2 border-ink bg-surface text-ink " +
  "font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] " +
  "hover:bg-chrome-400 hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "hover:shadow-[3px_3px_0px_0px_var(--color-ink)] " +
  "active:translate-x-0 active:translate-y-0 active:shadow-none " +
  "transition-all duration-150 cursor-pointer";

export default function CoverflowGallery({ images }: CoverflowGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );
  const wheelCooldown = useRef(false);

  const totalImages = images.length;
  const handlePrev = () =>
    setActiveIndex((p) => (p - 1 + totalImages) % totalImages);
  const handleNext = () => setActiveIndex((p) => (p + 1) % totalImages);

  // ── Breakpoint detection ────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setDeviceType(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Keyboard ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, totalImages]);

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(handleNext, 2000);
    return () => clearInterval(id);
  }, [isPlaying, activeIndex, totalImages]);

  // ── Wheel ───────────────────────────────────────────────────────────────────
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldown.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 20) {
      wheelCooldown.current = true;
      delta > 0 ? handleNext() : handlePrev();
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 700);
    }
  };

  // ── Mouse drag ──────────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => setDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 100) {
      diff > 0 ? handlePrev() : handleNext();
      setDragStart(e.clientX);
    }
  };
  const handleMouseUp = () => setDragStart(null);

  // ── Circular offset ─────────────────────────────────────────────────────────
  const getOffset = (index: number) => {
    let d = index - activeIndex;
    const h = Math.floor(totalImages / 2);
    while (d > h) d -= totalImages;
    while (d < -h) d += totalImages;
    return d;
  };

  const bp = deviceType;
  const card = CARD[bp];
  const spread = SIDE_SPREAD[bp];
  const containerH = card.h + 60;

  // Arrow size: small on mobile, normal on tablet+
  const arrowCls =
    bp === "mobile"
      ? `w-7 h-7 ${ARROW_BASE}` // 28px — compact for phone
      : `w-10 h-10 ${ARROW_BASE}`; // 40px — standard

  const iconCls = bp === "mobile" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div
      className="relative w-full flex flex-col select-none py-8 bg-transparent overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setIsPlaying(true);
      }}
      onMouseEnter={() => setIsPlaying(false)}
    >
      {/* ── Ambient glow ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto bg-cover bg-center transition-all duration-1000 blur-[120px] scale-110"
          style={{
            backgroundImage: `url(${images[activeIndex].url})`,
            width:
              bp === "desktop" ? "600px" : bp === "tablet" ? "320px" : "200px",
            height:
              bp === "desktop" ? "300px" : bp === "tablet" ? "220px" : "160px",
            opacity: bp === "desktop" ? 0.15 : bp === "tablet" ? 0.07 : 0.05,
          }}
        />
      </div>

      {/* ── Coverflow stage ─────────────────────────────────────────────── */}
      {/*
        Desktop: no arrows here — they live in the dots row below.
        Mobile + Tablet: arrows are absolute left/right inside the stage,
        vertically centred alongside the card stack.
      */}
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
          style={{
            width: card.w,
            height: card.h,
            transformStyle: "preserve-3d",
          }}
        >
          {images.map((img, index) => {
            const d = getOffset(index);
            const isCenter = d === 0;

            const xOffset = isCenter
              ? 0
              : d > 0
                ? (d - 1) * (card.w * 0.3) + spread
                : -((-d - 1) * (card.w * 0.3) + spread);

            const rotateY = isCenter ? 0 : d > 0 ? -42 : 42;
            const zOffset = isCenter ? 120 : -100 - Math.abs(d) * 40;
            const scale = isCenter
              ? 1.05
              : Math.max(0.65, 0.8 - Math.abs(d) * 0.06);
            const opacity = isCenter
              ? 1
              : Math.max(0.08, 0.6 - Math.abs(d) * 0.18);
            const cardBlur = isCenter
              ? "0px"
              : `${Math.min(Math.abs(d) * 1.5, 4)}px`;

            return (
              <motion.div
                key={index}
                animate={{ rotateY, x: xOffset, z: zOffset, scale, opacity }}
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
                style={{
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  width: card.w,
                  height: card.h,
                  zIndex: 20 - Math.abs(d),
                  filter: `blur(${cardBlur})`,
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  if (!isCenter) {
                    e.stopPropagation();
                    setActiveIndex(index);
                  }
                }}
                className="group border-3 border-ink bg-surface overflow-hidden cursor-pointer shadow-[2px_2px_0px_0px_var(--color-ink)]"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes={`${card.w}px`}
                    className="object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
                    priority={isCenter}
                  />
                  {!isCenter && (
                    <div className="absolute inset-0 bg-ink/40 transition-opacity duration-300" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Dots row + text ──────────────────────────────────────────────── */}
      <div className="z-10 flex flex-col items-center gap-5 mt-6">
        {/*
          Desktop: arrows flank the dots here in the bottom row.
          Mobile + Tablet: dots only — arrows already live in the stage above.
        */}
        <div className="flex items-center gap-4">
          {bp === "desktop" && (
            <button
              onClick={handlePrev}
              className={arrowCls}
              aria-label="Previous"
            >
              <FaChevronLeft className={iconCls} />
            </button>
          )}

          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 w-1.5 rotate-45 border transition-all duration-300 cursor-pointer ${
                  i === activeIndex
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
