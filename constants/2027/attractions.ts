import { Attraction } from "@/lib/types";
import { images } from "./cloudinary_images";

export const ATTRACTIONS: Attraction[] = [
  {
    url: images.victoria2,
    title: "Victoria Memorial",
    desc: "A magnificent white marble palace built between 1906 and 1921, blending British and Mughal architectures.",
  },
  {
    url: images.howrah2,
    title: "Howrah Bridge",
    desc: "An iconic cantilever steel bridge linking Kolkata and Howrah, serving as a gateway to the city.",
  },
  {
    url: images.dakshineshwar2,
    title: "Dakshineswar Kali Temple",
    desc: "A famous 19th-century temple complex built by Rani Rashmoni, situated on the bank of the Hooghly River.",
  },
  {
    url: images.prinsep,
    title: "Prinsep Ghat",
    desc: "A historic ghat in Kolkata, known for its cultural and historical significance.",
  },
  {
    url: images.stpauls,
    title: "St. Paul's Cathedral",
    desc: "A historic Anglican cathedral in Kolkata, known for its beautiful architecture and cultural significance.",
  },
  {
    url: images.museum,
    title: "Indian Museum",
    desc: "One of the oldest and most prestigious museums in India, housing a vast collection of art, artifacts, and natural history exhibits.",
  },
  {
    url: images.birla,
    title: "Birla Planetarium",
    desc: "A modern science museum and planetarium in Kolkata, known for its impressive dome and educational exhibits.",
  },
  {
    url: images.durga,
    title: "Durga Puja Carnival",
    desc: "Kolkata's signature autumn festival featuring spectacular art pandals, recognized by UNESCO.",
  },
  {
    url: images.tram,
    title: "Kolkata Tramway",
    desc: "Nostalgic electric streetcars winding through heritage routes, representing Asia's oldest operating tramway.",
  },
  {
    url: images.taxi2,
    title: "Yellow Ambassador Taxi",
    desc: "Iconic yellow retro cabs that are a vital and charming part of Kolkata's daily streetscape.",
  },
  {
    url: images.writers,
    title: "Writers' Building",
    desc: "A landmark colonial-era building in Kolkata that serves as an important seat of government administration.",
  },
];

export const CARD = {
  mobile: { w: 200, h: 260 },
  tablet: { w: 240, h: 300 },
  desktop: { w: 300, h: 370 },
} as const;

export const SIDE_SPREAD = {
  mobile: 130,
  tablet: 160,
  desktop: 200,
} as const;

export const ARROW_BASE =
  "flex items-center justify-center border-2 border-ink bg-surface text-ink " +
  "font-bold shadow-[2px_2px_0px_0px_var(--color-ink)] " +
  "hover:bg-chrome-400 hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "hover:shadow-[3px_3px_0px_0px_var(--color-ink)] " +
  "active:translate-x-0 active:translate-y-0 active:shadow-none " +
  "transition-all duration-150 cursor-pointer";