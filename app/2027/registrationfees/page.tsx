import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Registration Fees",
  description:
    "Detailed fee structure for ICAA — early-bird, standard, and student rates for authors and attendees.",
};

const RegistrationFeesPage = () => {
  return (
    <StubContents
      page="Registration Fees"
      heading="To be announced soon!"
      description="Fee structure for ICAA 2027 participants will be published here shortly."
    />
  );
};

export default RegistrationFeesPage;
