import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICAA 2027 Program Committee",
  description:
    "Information about the program committee for the International Conference on Applied Algorithms (ICAA) 2027.",
};
export default function ProgramCommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
