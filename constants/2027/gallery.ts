import { images} from "./cloudinary_images";
// ─── Lens sizing ──────────────────────────────────────────────────────────────
/** Fraction of the shorter gallery side used to compute the lens size */
export const LENS_RATIO = 0.38;

/** Minimum lens size in px — prevents the lens becoming unusably tiny on phones */
export const LENS_MIN = 80;

/** Maximum lens size in px — caps the lens on very wide screens */
export const LENS_MAX = 320;

// ─── Timing (all values in seconds) ──────────────────────────────────────────
/** Duration of each pan movement between random positions */
export const PAN_DURATION = 1;

/** How long the lens pauses at each random position */
export const HOLD_DURATION = 1.5;

/** How many random positions the lens visits before the full reveal */
export const PAN_COUNT = 4;

/** Duration of the lens expanding to cover the entire gallery */
export const EXPAND_DURATION = 1.5;

/** How long the full sharp gallery is held before the next cycle */
export const FULL_REVEAL_HOLD = 8;

/** Duration of the lens contracting from full-reveal back to a new position */
export const CONTRACT_DURATION = 1.5;

// ─── Visual ───────────────────────────────────────────────────────────────────
/** Blur applied to the out-of-focus background layer (px) */
export const BLUR_AMOUNT = 7;

/** Brightness multiplier for the out-of-focus background layer (0–1) */
export const BLUR_BRIGHTNESS = 0.5;

/**
 * Scale applied to the blurred layer so blur-edge artefacts are hidden
 * behind the container's overflow-hidden boundary.
 */
export const BLUR_SCALE = 1.06;

/** Initial delay before the first animation cycle starts (ms) */
export const INIT_DELAY_MS = 150;

// ─── Bento grid ───────────────────────────────────────────────────────────────
 
/**
 * Grid template areas — 4 columns × 3 rows.
 * Matches the AREAS array order: a b c d e f g
 *
 *   a a b c
 *   a a d d
 *   e f f g
 */
export const GRID_TEMPLATE_AREAS = `
  "a a b c"
  "a a d d"
  "e f f g"
`;
 
export const GRID_COLS = "repeat(4, 1fr)";
export const GRID_ROWS = "repeat(3, 1fr)";
export const GRID_GAP  = "4px";
 
/** Ordered list of grid-area identifiers — index matches the images[] prop */
export const GRID_AREAS = ["a", "b", "c", "d", "e", "f", "g"] as const;
export type  GridArea   = (typeof GRID_AREAS)[number];
 
/**
 * Normalised anchor points for each bento cell — expressed as fractions of
 * the gallery container (0–1). The lens centres itself on this point each pan.
 *
 * Layout reference (4 cols × 3 rows, each col = 0.25w, each row = 0.333h):
 *
 *   a a b c
 *   a a d d
 *   e f f g
 */
export const CELL_ANCHORS: Record<GridArea, { cx: number; cy: number }> = {
  a: { cx: 0.25,  cy: 0.333 },  // 2×2 feature — cols 0-1, rows 0-1
  b: { cx: 0.625, cy: 0.167 },  // portrait     — col 2,    row 0
  c: { cx: 0.875, cy: 0.167 },  // small sq     — col 3,    row 0
  d: { cx: 0.75,  cy: 0.500 },  // wide land    — cols 2-3, row 1
  e: { cx: 0.125, cy: 0.833 },  // small sq     — col 0,    row 2
  f: { cx: 0.500, cy: 0.833 },  // wide land    — cols 1-2, row 2
  g: { cx: 0.875, cy: 0.833 },  // small sq     — col 3,    row 2
};
 
// ─── Lens corner brackets ─────────────────────────────────────────────────────
 
/** Side length of each corner bracket in px */
export const BRACKET_SIZE = 24;
 
/** Stroke width of each corner bracket in px */
export const BRACKET_STROKE = 4;
 
/** Offset from the lens edge so the bracket sits just outside the boundary */
export const BRACKET_OFFSET = 3;
 
// ─── Label ────────────────────────────────────────────────────────────────────
 
/** Text shown in the neo-brutalist stamp label (bottom-right of the gallery) */
export const GALLERY_LABEL = "City of Joy ❤️";
 
// ─── Image manifest ───────────────────────────────────────────────────────────
// Drop images into public/2027/gallery/ and update paths here.
// Order must match the bento grid slot order (a → g):
//
//   Slot   Area   Cell description
//   ────────────────────────────────────────────────────────────────────────────
//   [0]    a      Large 2×2 feature cell   (top-left)
//   [1]    b      Small portrait cell      (top-middle)
//   [2]    c      Small square cell        (top-right)
//   [3]    d      Wide landscape cell      (middle-right)
//   [4]    e      Small square cell        (bottom-left)
//   [5]    f      Wide landscape cell      (bottom-middle)
//   [6]    g      Small square cell        (bottom-right)
 
export const GALLERY_IMAGES: string[] = [
  images.durga,
  images.howrah,
  images.dakshineshwar,
  images.victoria,
  images.taxi,
  images.bridge,
  images.tram,
];
