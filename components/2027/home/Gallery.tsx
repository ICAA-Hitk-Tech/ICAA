"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

// ─── Constants ───────────────────────────────────────────────────────────────
const LENS_SIZE        = 380;  // px  — square lens side length
const PAN_DURATION     = 1.2;  // sec — smooth pan between positions
const HOLD_DURATION    = 1;  // sec — dwell at each lens position
const PAN_COUNT        = 4;    // random stops before expand
const EXPAND_DURATION  = 1.5;  // sec — lens → full reveal
const FULL_REVEAL_HOLD = 8;    // sec — hold fully-sharp state
const CONTRACT_DURATION = 1.5; // sec — full reveal → new lens position (no snap!)
const BLUR_AMOUNT      = 7;    // px  — blur on background layer
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryProps {
  /**
   * 7 image URLs for the bento grid:
   *   [0] area-a — large 2×2  (top-left)
   *   [1] area-b — portrait   (top-middle)
   *   [2] area-c — small sq   (top-right)
   *   [3] area-d — wide land  (middle-right)
   *   [4] area-e — small sq   (bottom-left)
   *   [5] area-f — wide land  (bottom-middle)
   *   [6] area-g — small sq   (bottom-right)
   */
  images: string[];
}

// ─── Shared bento-grid style ─────────────────────────────────────────────────
// Defined once at module level so both layers receive IDENTICAL CSS,
// guaranteeing pixel-perfect overlap.
const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  width: "100%",
  height: "100%",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gridTemplateAreas: `
    "a a b c"
    "a a d d"
    "e f f g"
  `,
  gap: "6px",
};

const AREAS = ["a", "b", "c", "d", "e", "f", "g"] as const;

function BentoGrid({ images }: { images: string[] }) {
  return (
    <div style={GRID_STYLE}>
      {AREAS.map((area, i) => (
        <div
          key={area}
          style={{ gridArea: area, position: "relative", overflow: "hidden" }}
        >
          {images[i] ? (
            <Image
              src={images[i]}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              draggable={false}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--color-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.65rem",
                  color: "var(--color-ink-ghost)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {i + 1}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Pure helpers ─────────────────────────────────────────────────────────────
function randPos(W: number, H: number) {
  return {
    x: Math.random() * Math.max(0, W - LENS_SIZE),
    y: Math.random() * Math.max(0, H - LENS_SIZE),
  };
}

/** clip-path: inset(top right bottom left) that shows only the lens square */
function toInset(x: number, y: number, W: number, H: number) {
  return `inset(${y}px ${W - x - LENS_SIZE}px ${H - y - LENS_SIZE}px ${x}px)`;
}

// ─── Component ───────────────────────────────────────────────────────────────
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpRef     = useRef<HTMLDivElement>(null);
  const lensRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let activeTween: gsap.core.Tween | null = null;

    // ── Low-level animation primitives ─────────────────────────────────────
    // Direct element.style writes inside onUpdate — no gsap.set overhead,
    // everything stays in the same RAF tick for maximum smoothness.

    function tweenProxy<T extends object>(
      proxy: T,
      toVars: Omit<gsap.TweenVars, "onUpdate" | "onComplete">,
      onFrame: (p: T) => void
    ): Promise<void> {
      return new Promise((resolve) => {
        if (!alive) { resolve(); return; }
        activeTween?.kill();
        activeTween = gsap.to(proxy, {
          ...toVars,
          onUpdate() {
            if (alive) onFrame(proxy);
          },
          onComplete() {
            resolve();
          },
        });
      });
    }

    function wait(secs: number): Promise<void> {
      return new Promise((resolve) => {
        if (!alive) { resolve(); return; }
        activeTween?.kill();
        activeTween = gsap.to({}, { duration: secs, onComplete: resolve });
      });
    }

    // ── Main animation loop ─────────────────────────────────────────────────
    async function runLoop() {
      const container = containerRef.current;
      const sharp     = sharpRef.current;
      const lens      = lensRef.current;
      if (!container || !sharp || !lens) return;

      let W = container.offsetWidth;
      let H = container.offsetHeight;

      // First-ever start: snap to a random position once, then loop forever
      let pos = randPos(W, H);
      lens.style.transform = `translate(${pos.x}px,${pos.y}px)`;
      lens.style.opacity   = "1";
      sharp.style.clipPath = toInset(pos.x, pos.y, W, H);

      while (alive) {
        W = container.offsetWidth;
        H = container.offsetHeight;

        // ── Phase 1: PAN through PAN_COUNT random positions ────────────────
        for (let i = 0; i < PAN_COUNT; i++) {
          if (!alive) return;

          const dst   = randPos(W, H);
          const proxy = { x: pos.x, y: pos.y };

          await tweenProxy(
            proxy,
            { x: dst.x, y: dst.y, duration: PAN_DURATION, ease: "power2.inOut" },
            ({ x, y }) => {
              // One direct write per frame — fastest possible path
              lens.style.transform = `translate(${x}px,${y}px)`;
              sharp.style.clipPath = toInset(x, y, W, H);
            }
          );
          pos = dst;

          if (!alive) return;
          await wait(HOLD_DURATION);
        }

        // ── Phase 2: EXPAND — lens grows to fill entire gallery ────────────
        if (!alive) return;
        {
          const { x: ox, y: oy } = pos; // capture position before expand
          const proxy = { t: 0 };

          await tweenProxy(
            proxy,
            { t: 1, duration: EXPAND_DURATION, ease: "power2.inOut" },
            ({ t }) => {
              const inv = 1 - t;
              sharp.style.clipPath = `inset(${oy * inv}px ${(W - ox - LENS_SIZE) * inv}px ${(H - oy - LENS_SIZE) * inv}px ${ox * inv}px)`;
              lens.style.opacity   = String(inv);
            }
          );
        }

        // Clamp to exact full-reveal state
        sharp.style.clipPath = "inset(0px 0px 0px 0px)";
        lens.style.opacity   = "0";

        // ── Phase 3: HOLD the full-sharp view ─────────────────────────────
        if (!alive) return;
        await wait(FULL_REVEAL_HOLD);

        // ── Phase 4: CONTRACT — full reveal shrinks into a NEW lens position
        //    This is the fix for issue #2: no snap, the viewport itself closes
        //    down from inset(0,0,0,0) into the next position.
        if (!alive) return;
        W = container.offsetWidth;   // re-measure in case of resize during hold
        H = container.offsetHeight;

        const nxt   = randPos(W, H);
        const proxy = { t: 0 };

        await tweenProxy(
          proxy,
          { t: 1, duration: CONTRACT_DURATION, ease: "power2.inOut" },
          ({ t }) => {
            sharp.style.clipPath = `inset(${nxt.y * t}px ${(W - nxt.x - LENS_SIZE) * t}px ${(H - nxt.y - LENS_SIZE) * t}px ${nxt.x * t}px)`;
            lens.style.transform = `translate(${nxt.x}px,${nxt.y}px)`;
            lens.style.opacity   = String(t);
          }
        );
        pos = nxt;

        // Brief hold at the newly contracted lens before the next round of pans
        if (!alive) return;
        await wait(HOLD_DURATION);

        // → while(alive) continues: next iteration starts Phase 1 again
        //   from pos = nxt, with fresh W/H. No snap, ever.
      }
    }

    const id = setTimeout(runLoop, 150); // let layout paint first

    return () => {
      alive = false;
      clearTimeout(id);
      activeTween?.kill();
    };
  }, []); // intentionally empty — runs once on mount

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-16">
      {/* ── Section header ──────────────────────────────────────────────── */}
      {/* <div className="flex flex-col items-center gap-3 mb-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink text-center leading-tight">
          Gallery
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-0.5 w-16 bg-abyss-500" />
          <div className="h-0.5 w-3 bg-chrome-400" />
        </div>
        <p className="font-sans text-sm text-ink-dim text-center max-w-md mt-1">
          A glimpse into the ICAA experience — campus, sessions, and moments
          from past editions.
        </p>
      </div> */}

      {/* ── Gallery container ────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full  overflow-hidden"
        style={{ aspectRatio: "16 / 7" }}
      >
        {/* Bottom layer — always blurred & darkened */}
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${BLUR_AMOUNT}px) brightness(0.5)`,
            transform: "scale(1.05)", // hides blur fringe at edges
            transformOrigin: "center center",
          }}
          aria-hidden
        >
          <BentoGrid images={images} />
        </div>

        {/* Top layer — full brightness, clipped to the lens region */}
        <div
          ref={sharpRef}
          className="absolute inset-0"
          style={{
            clipPath: "inset(0px 100% 100% 0px)", // hidden until loop starts
            willChange: "clip-path",               // hint GPU compositing layer
          }}
          aria-hidden
        >
          <BentoGrid images={images} />
        </div>

        {/* Lens border — moves in lockstep with clip-path via direct transform */}
        <div
          ref={lensRef}
          className="absolute pointer-events-none"
          style={{
            width:  LENS_SIZE,
            height: LENS_SIZE,
            top:  0,
            left: 0,
            border: "2px solid rgba(245,240,232,0.75)",
            boxShadow:
              "0 0 0 1px rgba(21,21,16,0.35), " +
              "inset 0 0 0 1px rgba(21,21,16,0.15), " +
              "0 6px 32px rgba(0,0,0,0.4)",
            willChange: "transform, opacity",
          }}
        >
          {/* Corner brackets in chrome-gold */}
          {[
            { top: 0,    left:  0,   borderWidth: "2px 0 0 2px" },
            { top: 0,    right: 0,   borderWidth: "2px 2px 0 0" },
            { bottom: 0, left:  0,   borderWidth: "0 0 2px 2px" },
            { bottom: 0, right: 0,   borderWidth: "0 2px 2px 0" },
          ].map((style, i) => (
            <span
              key={i}
              style={{
                position:    "absolute",
                width:       14,
                height:      14,
                borderColor: "var(--color-chrome-400)",
                borderStyle: "solid",
                ...style,
              }}
            />
          ))}
        </div>

        {/* Neo-brutalist label */}
        <div
          className="hidden lg:block absolute bottom-3 right-3 bg-chrome-400 text-ink text-xs font-mono font-bold px-3 py-1 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] uppercase tracking-widest pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          City of Joy
        </div>
      </div>
    </section>
  );
};

export default Gallery;