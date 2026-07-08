import HeroSection from "@/components/2027/home/HeroSection";
import KeynoteSpeakers from "@/components/2027/home/KeynoteSpeakers";
import OrganizedBy from "@/components/2027/home/OrganizedBy";
import Gallery from "@/components/2027/home/Gallery";
import { GALLERY_IMAGES } from "@/constants/2027/gallery";
import Announcements from "@/components/2027/home/Announcements";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";
import { images } from "@/constants/2027/cloudinary_images";

const ICAA_ALIASES = [
  `ICAA ${ACTIVE_YEAR}`,
  `icaa ${ACTIVE_YEAR}`,
  `Icaa ${ACTIVE_YEAR}`,
  `ICAA${ACTIVE_YEAR}`,
  `icaa${ACTIVE_YEAR}`,
  `Icaa${ACTIVE_YEAR}`,
  `ICAA ${String(ACTIVE_YEAR).slice(-2)}`,
  `icaa ${String(ACTIVE_YEAR).slice(-2)}`,
  `Icaa ${String(ACTIVE_YEAR).slice(-2)}`,
  `ICAA${String(ACTIVE_YEAR).slice(-2)}`,
  `icaa${String(ACTIVE_YEAR).slice(-2)}`,
  `Icaa${String(ACTIVE_YEAR).slice(-2)}`,
  "ICAA",
  "icaa",
  "Icaa",
  "International Conference on Applied Algorithms",
  "International Conference on Applied Algorithms (ICAA)",
  "international conference on applied algorithms",
  "international conference on applied algorithms (ICAA)",
];

export default function HomePage2027() {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `International Conference on Applied Algorithms (ICAA) ${ACTIVE_YEAR}`,
    alternateName: ICAA_ALIASES,
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
      alternateName: [
        "Heritage Institute of Technology",
        "HIT Kolkata",
        "HITK",
        "hitk",
        "hit kolkata",
        "heritage institute of technology kolkata",
        "heritage institute of technology",
        "heritage institute",
        "heritage kolkata",
        "heritage college kolkata",
        "heritage college",
        "heritage institute of technology india",
        "heritage institute of technology west bengal",
        "heritage institute of technology india kolkata",
        "heritage institute of technology india west bengal",
      ],
      url: "https://www.heritageit.edu/",
    },
    description: `ICAA ${ACTIVE_YEAR} brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`,
    image: images.hero,
    url: `${SITE_URL}/${ACTIVE_YEAR}`,
    // Optional but recommended if you have ticketing/registration:
    // offers: { "@type": "Offer", url: `${SITE_URL}/register`, availability: "https://schema.org/InStock" },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: `ICAA ${ACTIVE_YEAR}`,
    alternateName: ICAA_ALIASES,
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
