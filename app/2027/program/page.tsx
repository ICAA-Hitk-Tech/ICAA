import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Program Schedule",
  description:
    "Full conference schedule for ICAA — session timings, keynote talks, paper presentations, and special events.",
};

const ProgramPage = () => {
  return (
    <StubContents
      page="Program"
      heading="To be announced soon!"
      description="The full conference program for ICAA 2027 will be published here closer to the event."
    />
  );
};

export default ProgramPage;
