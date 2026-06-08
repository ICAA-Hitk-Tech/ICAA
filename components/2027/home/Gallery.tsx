"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

// ─── Constants ───────────────────────────────────────────────────────────────
// LENS_SIZE is now computed at runtime from the container — see getLensSize().
const LENS_RATIO       = 0.38;  // fraction of the shorter gallery side
const LENS_MIN         = 80;    // px — smallest the lens ever gets (tiny phones)
const LENS_MAX         = 320;   // px — largest the lens ever gets (big desktops)
const PAN_DURATION     = 1.4;   // sec
const HOLD_DURATION    = 2.5;   // sec
const PAN_COUNT        = 4;
const EXPAND_DURATION  = 1.6;   // sec — lens → full reveal
const FULL_REVEAL_HOLD = 8;     // sec
const CONTRACT_DURATION = 1.6;  // sec — full reveal → new lens (no snap!)
const BLUR_AMOUNT      = 7;     // px
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
// Defined once at module level — both layers get identical CSS for pixel-perfect overlap.
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
  gap: "4px",
  backgroundColor: "var(--color-border)", // gap gutters
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
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                  fontSize: "0.6rem",
                  color: "var(--color-ink-ghost)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
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

/** Lens size adapts to the container — clamped so it always fits */
function getLensSize(W: number, H: number): number {
  const raw = Math.min(W, H) * LENS_RATIO;
  return Math.round(Math.min(Math.max(raw, LENS_MIN), LENS_MAX));
}

/** Random lens position guaranteed to keep the entire lens inside the gallery */
function randPos(W: number, H: number, ls: number) {
  return {
    x: Math.random() * Math.max(0, W - ls),
    y: Math.random() * Math.max(0, H - ls),
  };
}

/** clip-path: inset(top right bottom left) revealing only the lens square */
function toInset(x: number, y: number, W: number, H: number, ls: number) {
  return `inset(${y}px ${W - x - ls}px ${H - y - ls}px ${x}px)`;
}

// ─── Component ───────────────────────────────────────────────────────────────
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpRef     = useRef<HTMLDivElement>(null);
  const lensRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let activeTween: gsap.core.Tween | null = null;

    // ── Animation primitives ──────────────────────────────────────────────
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
          onUpdate() { if (alive) onFrame(proxy); },
          onComplete() { resolve(); },
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

    // ── Main animation loop ───────────────────────────────────────────────
    async function runLoop() {
      const container = containerRef.current;
      const sharp     = sharpRef.current;
      const lens      = lensRef.current;
      if (!container || !sharp || !lens) return;

      let W  = container.offsetWidth;
      let H  = container.offsetHeight;
      let ls = getLensSize(W, H);

      // Apply computed lens size to the DOM element
      lens.style.width  = `${ls}px`;
      lens.style.height = `${ls}px`;

      // One-time initial snap to a random position
      let pos = randPos(W, H, ls);
      lens.style.transform = `translate(${pos.x}px,${pos.y}px)`;
      lens.style.opacity   = "1";
      sharp.style.clipPath = toInset(pos.x, pos.y, W, H, ls);

      while (alive) {
        // Re-measure on every cycle — handles window resize gracefully
        W  = container.offsetWidth;
        H  = container.offsetHeight;
        ls = getLensSize(W, H);
        lens.style.width  = `${ls}px`;
        lens.style.height = `${ls}px`;

        // ── Phase 1: PAN through PAN_COUNT random positions ───────────────
        for (let i = 0; i < PAN_COUNT; i++) {
          if (!alive) return;

          const dst   = randPos(W, H, ls);
          const proxy = { x: pos.x, y: pos.y };

          await tweenProxy(
            proxy,
            { x: dst.x, y: dst.y, duration: PAN_DURATION, ease: "power2.inOut" },
            ({ x, y }) => {
              lens.style.transform = `translate(${x}px,${y}px)`;
              sharp.style.clipPath = toInset(x, y, W, H, ls);
            }
          );
          pos = dst;

          if (!alive) return;
          await wait(HOLD_DURATION);
        }

        // ── Phase 2: EXPAND — current lens grows to cover entire gallery ───
        if (!alive) return;
        {
          const { x: ox, y: oy } = pos;
          const proxy = { t: 0 };

          await tweenProxy(
            proxy,
            { t: 1, duration: EXPAND_DURATION, ease: "power2.inOut" },
            ({ t }) => {
              const inv = 1 - t;
              sharp.style.clipPath = `inset(${oy * inv}px ${(W - ox - ls) * inv}px ${(H - oy - ls) * inv}px ${ox * inv}px)`;
              lens.style.opacity   = String(inv);
            }
          );
        }

        // Clamp to exact full-reveal
        sharp.style.clipPath = "inset(0px 0px 0px 0px)";
        lens.style.opacity   = "0";

        // ── Phase 3: HOLD the full-sharp view ─────────────────────────────
        if (!alive) return;
        await wait(FULL_REVEAL_HOLD);

        // ── Phase 4: CONTRACT — the full view closes down into a new lens ──
        if (!alive) return;
        // Re-measure again — user may have resized during the 8s hold
        W  = container.offsetWidth;
        H  = container.offsetHeight;
        ls = getLensSize(W, H);
        lens.style.width  = `${ls}px`;
        lens.style.height = `${ls}px`;

        const nxt   = randPos(W, H, ls);
        const proxy = { t: 0 };

        await tweenProxy(
          proxy,
          { t: 1, duration: CONTRACT_DURATION, ease: "power2.inOut" },
          ({ t }) => {
            sharp.style.clipPath = `inset(${nxt.y * t}px ${(W - nxt.x - ls) * t}px ${(H - nxt.y - ls) * t}px ${nxt.x * t}px)`;
            lens.style.transform = `translate(${nxt.x}px,${nxt.y}px)`;
            lens.style.opacity   = String(t);
          }
        );
        pos = nxt;

        if (!alive) return;
        await wait(HOLD_DURATION);
        // → while continues: pans again from pos = nxt, no snap ever
      }
    }

    const id = setTimeout(runLoop, 150);

    return () => {
      alive = false;
      clearTimeout(id);
      activeTween?.kill();
    };
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-10 md:py-16">
      <div
        ref={containerRef}
        className="relative w-full border-2 overflow-hidden aspect-4/3 sm:aspect-video lg:aspect-16/7"
      >
        {/* Bottom layer — always blurred & darkened */}
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${BLUR_AMOUNT}px) brightness(0.5)`,
            transform: "scale(1.06)",
            transformOrigin: "center center",
          }}
          aria-hidden
        >
          <BentoGrid images={images} />
        </div>

        {/* Top layer — full brightness, clipped to lens */}
        <div
          ref={sharpRef}
          className="absolute inset-0"
          style={{
            clipPath: "inset(0px 100% 100% 0px)",
            willChange: "clip-path",
          }}
          aria-hidden
        >
          <BentoGrid images={images} />
        </div>

        {/* Lens frame — corner brackets only, no enclosing border */}
        <div
          ref={lensRef}
          className="absolute pointer-events-none"
          style={{
            // Initial size; overwritten by runLoop before first paint
            width: LENS_MIN,
            height: LENS_MIN,
            top: 0,
            left: 0,
            willChange: "transform, opacity",
          }}
        >
          {/* Corner brackets — yellow, heavier stroke, no surrounding box */}
          {[
            { top: -3, left: -3, borderWidth: "4px 0 0 4px" },
            { top: -3, right: -1, borderWidth: "4px 4px 0 0" },
            { bottom: -1, left: -3, borderWidth: "0 0 4px 4px" },
            { bottom: -1, right: -1, borderWidth: "0 4px 4px 0" },
          ].map((style, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                borderColor: "var(--color-chrome-400)",
                borderStyle: "solid",
                ...style,
              }}
            />
          ))}
        </div>

        {/* Neo-brutalist label */}
        <div
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-chrome-400 text-ink text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] tracking-widest pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          City of Joy ❤️
        </div>
      </div>
    </section>
  );
};

export default Gallery;