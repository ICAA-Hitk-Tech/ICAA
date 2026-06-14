import HeroSection from "@/components/2027/home/HeroSection";
import KeynoteSpeakers from "@/components/2027/home/KeynoteSpeakers";
import OrganizedBy from "@/components/2027/home/OrganizedBy";
import Gallery from "@/components/2027/home/Gallery";
import { GALLERY_IMAGES } from "@/constants/2027/gallery";
import Announcements from "@/components/2027/home/Announcements";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";
import { images } from "@/constants/2027/cloudinary_images";

export default function HomePage2027() {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `International Conference on Applied Algorithms (ICAA) ${ACTIVE_YEAR}`,
    startDate: `${ACTIVE_YEAR}-01-06`,
    endDate: `${ACTIVE_YEAR}-01-08`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Heritage Institute of Technology, Kolkata",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chowbaga Road, Anandapur",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700107",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Heritage Institute of Technology, Kolkata",
      url: "https://www.heritageit.edu/",
    },
    description: `ICAA ${ACTIVE_YEAR} brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`,
    image: images.hero,
    url: `${SITE_URL}/${ACTIVE_YEAR}`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    url: SITE_URL,
    name: `ICAA ${ACTIVE_YEAR}`,
    description: `The International Conference on Applied Algorithms (ICAA) brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="w-full">
        <HeroSection />
        <Announcements />
        <OrganizedBy />
        <KeynoteSpeakers />
        <Gallery images={GALLERY_IMAGES} />
      </div>
    </>
  );
}
