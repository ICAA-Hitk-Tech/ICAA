import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICAA 2027 Paper Submission",
  description: "Submission instructions, formatting guidelines, and topics of interest for the International Conference on Applied Algorithms (ICAA) 2027.",
};

export default function PaperSubmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
