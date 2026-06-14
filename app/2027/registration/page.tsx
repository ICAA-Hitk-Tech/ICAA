import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register for ICAA — author registration, attendee registration, fees, and payment information.",
};

const RegistrationPage = () => {
  return (
    <StubContents
      page="Registration"
      heading="To be announced soon!"
      description="Registration for ICAA 2027 will open soon. Check back for the registration portal link."
    />
  );
};

export default RegistrationPage;
