import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Call for Papers",
  description:
    "Submit your research contributions to ICAA 2027 and join us in advancing the field of computer science.",
};

const CallForPapersPage = () => {
  return (
    <StubContents
      page="Call for Papers"
      heading="Submit Your Research"
      description="We invite you to submit your original research contributions to ICAA 2027. Your work will be evaluated by a panel of experts, and selected papers will be presented at the conference.
      review process."
    />
  );
}

export default CallForPapersPage;