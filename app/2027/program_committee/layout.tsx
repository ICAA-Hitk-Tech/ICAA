import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Committee",
  description: "Meet the program committee members and reviewers of ICAA — experts in algorithms, combinatorics, and theoretical computer science.",
};
export default function ProgramCommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
