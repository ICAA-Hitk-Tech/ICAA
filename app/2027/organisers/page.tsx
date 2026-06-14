import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Organisers",
  description:
    "General chairs, program chairs, and the organizing committee of ICAA at Heritage Institute of Technology, Kolkata.",
};

const OrganisersPage = () => {
  return (
    <StubContents
      page="Organisers"
      heading="To be announced soon!"
      description="Details about the organising committee for ICAA 2027 will be published here soon."
    />
  );
};

export default OrganisersPage;
