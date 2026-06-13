import type { Metadata } from "next";
import { DM_Serif_Display, Spline_Sans_Mono, Roboto_Mono } from 'next/font/google';
import "@/styles/2027/globals.css";
import Navbar from "@/components/2027/layout/Navbar";
import Footer from "@/components/2027/layout/Footer";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  alternates: {
    canonical: `/${ACTIVE_YEAR}`,
  },
  openGraph: {
    url: `${SITE_URL}/${ACTIVE_YEAR}`,
  },
};

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

