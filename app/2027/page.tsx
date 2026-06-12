import HeroSection from "@/components/2027/home/HeroSection";
import KeynoteSpeakers from "@/components/2027/home/KeynoteSpeakers";
import OrganizedBy from "@/components/2027/home/OrganizedBy";
import Gallery from "@/components/2027/home/Gallery";
import { GALLERY_IMAGES } from "@/constants/2027/gallery";

import Announcements from "@/components/2027/home/Announcements";

export default function HomePage2027() {
  return (
    <div className="w-full">
      <HeroSection />
      <Announcements />
      <OrganizedBy />
      <KeynoteSpeakers />
      <Gallery images={GALLERY_IMAGES} />
    </div>
  );
}
