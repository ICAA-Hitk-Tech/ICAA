import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paper Submission",
  description: "Submission instructions, formatting guidelines, and topics of interest for ICAA — submit your research on algorithm design and analysis.",
};

export default function PaperSubmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
