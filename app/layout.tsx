import type { Metadata } from "next";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";
import { images } from "@/constants/2027/cloudinary_images";

const DESCRIPTION = `The International Conference on Applied Algorithms (ICAA) brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `ICAA ${ACTIVE_YEAR}`,
    template: `ICAA ${ACTIVE_YEAR} %s`,
  },
  description: DESCRIPTION,
  keywords: [
    "ICAA",
    `ICAA ${ACTIVE_YEAR}`,
    "International Conference on Applied Algorithms",
    "algorithms",
    "computer science conference",
    "Heritage Institute of Technology",
    "Kolkata",
    "India",
  ],
  authors: [{ name: "Heritage Institute of Technology, Kolkata" }],
  creator: "Heritage Institute of Technology, Kolkata",
  publisher: "Heritage Institute of Technology, Kolkata",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: `International Conference on Applied Algorithms (ICAA) ${ACTIVE_YEAR}`,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: `ICAA ${ACTIVE_YEAR}`,
    images: [{ url: images.hero, width: 1200, height: 630, alt: `ICAA ${ACTIVE_YEAR} hero image` }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `International Conference on Applied Algorithms (ICAA) ${ACTIVE_YEAR}`,
    description: DESCRIPTION,
    images: [images.hero],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

