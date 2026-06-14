import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description: "Keynote speakers and invited lecturers at ICAA — leading researchers presenting cutting-edge work in algorithms and computation.",
};

const KeynoteSpeakersPage = () => {
  return (
    <StubContents
      page="Keynote Speakers"
      heading="To be announced soon!"
      description="Our keynote speakers for ICAA 2027 will be announced shortly. Check back for updates."
    />
  );
}

export default KeynoteSpeakersPage;