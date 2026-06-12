"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

import {
  LENS_RATIO,
  LENS_MIN,
  LENS_MAX,
  PAN_DURATION,
  HOLD_DURATION,
  PAN_COUNT,
  EXPAND_DURATION,
  FULL_REVEAL_HOLD,
  CONTRACT_DURATION,
  BLUR_AMOUNT,
  BLUR_BRIGHTNESS,
  BLUR_SCALE,
  INIT_DELAY_MS,
  GRID_TEMPLATE_AREAS,
  GRID_COLS,
  GRID_ROWS,
  GRID_GAP,
  GRID_AREAS,
  CELL_ANCHORS,
  BRACKET_SIZE,
  BRACKET_STROKE,
  BRACKET_OFFSET,
  GALLERY_LABEL,
  type GridArea,
} from "../../../constants/2027/gallery";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Shared grid style ────────────────────────────────────────────────────────

const GRID_STYLE: React.CSSProperties = {
  display: "grid",
  width: "100%",
  height: "100%",
  gridTemplateColumns: GRID_COLS,
  gridTemplateRows: GRID_ROWS,
  gridTemplateAreas: GRID_TEMPLATE_AREAS,
  gap: GRID_GAP,
};

// ─── Corner bracket positions ─────────────────────────────────────────────────

const BRACKETS: React.CSSProperties[] = [
  {
    top: -BRACKET_OFFSET,
    left: -BRACKET_OFFSET,
    borderWidth: `${BRACKET_STROKE}px 0 0 ${BRACKET_STROKE}px`,
  },
  {
    top: -BRACKET_OFFSET,
    right: -(BRACKET_OFFSET - 2),
    borderWidth: `${BRACKET_STROKE}px ${BRACKET_STROKE}px 0 0`,
  },
  {
    bottom: -(BRACKET_OFFSET - 2),
    left: -BRACKET_OFFSET,
    borderWidth: `0 0 ${BRACKET_STROKE}px ${BRACKET_STROKE}px`,
  },
  {
    bottom: -(BRACKET_OFFSET - 2),
    right: -(BRACKET_OFFSET - 2),
    borderWidth: `0 ${BRACKET_STROKE}px ${BRACKET_STROKE}px 0`,
  },
];

// ─── Pure helpers ─────────────────────────────────────────────────────────────

/** Lens size adapts to the container — always clamped between LENS_MIN and LENS_MAX */
function getLensSize(W: number, H: number): number {
  const raw = Math.min(W, H) * LENS_RATIO;
  return Math.round(Math.min(Math.max(raw, LENS_MIN), LENS_MAX));
}

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the array.
 * Used to build a fresh cell deck each cycle so no cell repeats
 * until all others have been visited.
 */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Converts a cell's normalised anchor (cx, cy) into a pixel lens position
 * so the lens is centred on that cell, clamped inside the gallery boundary.
 */
function anchorToPos(
  cx: number,
  cy: number,
  W: number,
  H: number,
  ls: number,
): { x: number; y: number } {
  const x = Math.min(Math.max(cx * W - ls / 2, 0), W - ls);
  const y = Math.min(Math.max(cy * H - ls / 2, 0), H - ls);
  return { x, y };
}

/**
 * Converts a lens (x, y) position into a CSS clip-path inset() string
 * that reveals only the lens square on the sharp top layer.
 */
function toInset(
  x: number,
  y: number,
  W: number,
  H: number,
  ls: number,
): string {
  return `inset(${y}px ${W - x - ls}px ${H - y - ls}px ${x}px)`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BentoGrid({ images }: { images: string[] }) {
  return (
    <div style={GRID_STYLE}>
      {GRID_AREAS.map((area, i) => (
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
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
              <span className="font-mono text-[0.6rem] text-neutral-500 uppercase tracking-widest">
                {i + 1}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LensFrame() {
  return (
    <>
      {BRACKETS.map((style, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: BRACKET_SIZE,
            height: BRACKET_SIZE,
            borderColor: "var(--color-chrome-400, #facc15)",
            borderStyle: "solid",
            ...style,
          }}
        />
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let activeTween: gsap.core.Tween | null = null;

    // ── Animation primitives ──────────────────────────────────────────────

    function tweenProxy<T extends object>(
      proxy: T,
      toVars: Omit<gsap.TweenVars, "onUpdate" | "onComplete">,
      onFrame: (p: T) => void,
    ): Promise<void> {
      return new Promise((resolve) => {
        if (!alive) {
          resolve();
          return;
        }
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
        if (!alive) {
          resolve();
          return;
        }
        activeTween?.kill();
        activeTween = gsap.to({}, { duration: secs, onComplete: resolve });
      });
    }

    // ── Cell deck ─────────────────────────────────────────────────────────
    // A shuffled copy of all grid areas. We pop from it each pan so every
    // cell is visited exactly once before the deck is re-shuffled.
    // Guaranteed: the first cell of the new deck is never the same as the
    // last cell of the previous deck (we re-shuffle until it differs).

    let deck: GridArea[] = [];
    let lastCell: GridArea | null = null;

    function nextCell(): GridArea {
      if (deck.length === 0) {
        // Refill and shuffle — ensure new deck's first card != last visited
        do {
          deck = shuffle(GRID_AREAS);
        } while (lastCell !== null && deck[0] === lastCell);
      }
      const cell = deck.pop()!;
      lastCell = cell;
      return cell;
    }

    // ── Main animation loop ───────────────────────────────────────────────

    async function runLoop() {
      const container = containerRef.current;
      const sharp = sharpRef.current;
      const lens = lensRef.current;
      if (!container || !sharp || !lens) return;

      let W = container.offsetWidth;
      let H = container.offsetHeight;
      let ls = getLensSize(W, H);

      lens.style.width = `${ls}px`;
      lens.style.height = `${ls}px`;
      lens.style.opacity = "1";

      // Initial snap to the first cell — no tween on first frame
      const firstCell = nextCell();
      let pos = anchorToPos(
        CELL_ANCHORS[firstCell].cx,
        CELL_ANCHORS[firstCell].cy,
        W,
        H,
        ls,
      );
      lens.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      sharp.style.clipPath = toInset(pos.x, pos.y, W, H, ls);

      while (alive) {
        W = container.offsetWidth;
        H = container.offsetHeight;
        ls = getLensSize(W, H);
        lens.style.width = `${ls}px`;
        lens.style.height = `${ls}px`;

        // ── Phase 1: Pan through PAN_COUNT unique cells ───────────────────
        // nextCell() pops from a shuffled deck — guaranteed no repeat
        // until all 7 cells have been visited.
        for (let i = 0; i < PAN_COUNT; i++) {
          if (!alive) return;

          const cell = nextCell();
          const dst = anchorToPos(
            CELL_ANCHORS[cell].cx,
            CELL_ANCHORS[cell].cy,
            W,
            H,
            ls,
          );
          const proxy = { x: pos.x, y: pos.y };

          await tweenProxy(
            proxy,
            {
              x: dst.x,
              y: dst.y,
              duration: PAN_DURATION,
              ease: "power2.inOut",
            },
            ({ x, y }) => {
              lens.style.transform = `translate(${x}px, ${y}px)`;
              sharp.style.clipPath = toInset(x, y, W, H, ls);
            },
          );
          pos = dst;

          if (!alive) return;
          await wait(HOLD_DURATION);
        }

        // ── Phase 2: Expand — lens grows to cover the entire gallery ──────
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
              lens.style.opacity = String(inv);
            },
          );
        }

        sharp.style.clipPath = "inset(0px 0px 0px 0px)";
        lens.style.opacity = "0";

        // ── Phase 3: Hold the full-sharp view ─────────────────────────────
        if (!alive) return;
        await wait(FULL_REVEAL_HOLD);

        // ── Phase 4: Contract — full view closes into the next cell ───────
        if (!alive) return;

        W = container.offsetWidth;
        H = container.offsetHeight;
        ls = getLensSize(W, H);
        lens.style.width = `${ls}px`;
        lens.style.height = `${ls}px`;

        const nextC = nextCell();
        const nxt = anchorToPos(
          CELL_ANCHORS[nextC].cx,
          CELL_ANCHORS[nextC].cy,
          W,
          H,
          ls,
        );
        const proxy = { t: 0 };

        await tweenProxy(
          proxy,
          { t: 1, duration: CONTRACT_DURATION, ease: "power2.inOut" },
          ({ t }) => {
            sharp.style.clipPath = `inset(${nxt.y * t}px ${(W - nxt.x - ls) * t}px ${(H - nxt.y - ls) * t}px ${nxt.x * t}px)`;
            lens.style.transform = `translate(${nxt.x}px, ${nxt.y}px)`;
            lens.style.opacity = String(t);
          },
        );
        pos = nxt;

        if (!alive) return;
        await wait(HOLD_DURATION);
      }
    }

    const id = setTimeout(runLoop, INIT_DELAY_MS);

    return () => {
      alive = false;
      clearTimeout(id);
      activeTween?.kill();
    };
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-8 mb-10">
      <div
        ref={containerRef}
        className="relative w-full border-2 overflow-hidden aspect-4/3 sm:aspect-video lg:aspect-16/7"
      >
        {/* Bottom layer — always blurred & darkened */}
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${BLUR_AMOUNT}px) brightness(${BLUR_BRIGHTNESS})`,
            transform: `scale(${BLUR_SCALE})`,
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

        {/* Lens frame — corner brackets only */}
        <div
          ref={lensRef}
          className="absolute pointer-events-none"
          style={{
            width: LENS_MIN,
            height: LENS_MIN,
            top: 0,
            left: 0,
            willChange: "transform, opacity",
          }}
        >
          <LensFrame />
        </div>

        {/* Neo-brutalist stamp label */}
        <div
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-chrome-400 text-ink text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] tracking-widest pointer-events-none select-none"
          style={{ zIndex: 10 }}
        >
          {GALLERY_LABEL}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
