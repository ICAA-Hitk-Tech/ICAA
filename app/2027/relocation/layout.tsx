import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICAA 2027 Travel & Relocation",
  description:
    "Travel and relocation information for the International Conference on Applied Algorithms (ICAA) 2027.",
};

export default function TravelAndRelocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
