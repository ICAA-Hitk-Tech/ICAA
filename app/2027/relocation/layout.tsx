import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel & Accommodation",
  description:
    "Travel and accommodation information for ICAA — hotels near the venue, local attractions, visa assistance, and emergency contacts.",
};

export default function TravelAndRelocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
