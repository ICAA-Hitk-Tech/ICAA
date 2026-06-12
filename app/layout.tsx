import type { Metadata } from "next";
import { ACTIVE_YEAR } from "@/lib/config";
import { images} from "@/constants/2027/cloudinary_images";

export const metadata: Metadata = {
  title: `ICAA ${ACTIVE_YEAR}`,
  description: `The International Conference on Applied Algorithms (ICAA) brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`,
  openGraph: {
    title: `International Conference on Applied Algorithms (ICAA) ${ACTIVE_YEAR}`,
    description: `The International Conference on Applied Algorithms (ICAA) brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.`,
    images: [{ url: images.hero, width: 1200, height: 630 }],
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

