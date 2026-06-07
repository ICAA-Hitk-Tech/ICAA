import type { Metadata } from "next";
import { DM_Serif_Display, Spline_Sans_Mono, Roboto_Mono } from 'next/font/google';
import "@/styles/2027/globals.css";
import Navbar from "@/components/2027/layout/Navbar";
import Footer from "@/components/2027/layout/Footer";
import { ACTIVE_YEAR } from "@/lib/config";

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
});

const spline = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-spline',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: `ICAA ${ACTIVE_YEAR} — International Conference on Applied Algorithms`,
  description: `ICAA ${ACTIVE_YEAR} takes place January 6–8, ${ACTIVE_YEAR} at Heritage Institute of Technology, Kolkata. Join researchers from around the world for three days of cutting-edge algorithm research.`,
  openGraph: {
    title: `ICAA ${ACTIVE_YEAR}`,
    description: `International Conference on Applied Algorithms — January 6–8, ${ACTIVE_YEAR}, Kolkata, India.`,
    images: [{ url: `/${ACTIVE_YEAR}/og-image.png`, width: 1200, height: 630 }],
  },
};

export default function Year2027Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSerif.variable} ${spline.variable} ${robotoMono.variable} font-sans flex flex-col min-h-screen`}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

