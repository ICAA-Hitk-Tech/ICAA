import HeroSection from "@/components/2027/home/HeroSection";
import KeynoteSpeakers from "@/components/2027/home/KeynoteSpeakers";
import OrganizedBy from "@/components/2027/home/OrganizedBy";
import Gallery from "@/components/2027/home/Gallery";

/**
 * Replace these paths with your actual images once you drop them into
 * public/2027/gallery/. The bento grid expects 7 images:
 *   [0] area-a — large 2×2 cell (top-left)
 *   [1] area-b — small portrait cell (top-middle) (done)
 *   [2] area-c — small square cell (top-right)
 *   [3] area-d — wide landscape cell (middle-right) (done)
 *   [4] area-e — small square cell (bottom-left)
 *   [5] area-f — wide landscape cell (bottom-middle) (done)
 *   [6] area-g — small square cell (bottom-right)
 */
const GALLERY_IMAGES = [
  "/2027/gallery/durga.jpeg",
  "/2027/gallery/howrah.jpeg",
  "/2027/gallery/victoria.jpeg",
  "/2027/gallery/3.png",
  "/2027/gallery/taxi.jpeg",
  "/2027/gallery/4.jpeg",
  "/2027/gallery/tram.jpeg",
];

export default function HomePage2027() {
  return (
    <div className="w-full">
      <HeroSection />
      <OrganizedBy />
      <KeynoteSpeakers />
      <Gallery images={GALLERY_IMAGES} />
    </div>
  );
}
