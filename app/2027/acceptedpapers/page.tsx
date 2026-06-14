import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Accepted Papers",
  description:
    "Browse the accepted papers and research contributions selected for presentation at ICAA.",
};

const AcceptedPapersPage = () => {
  return (
    <StubContents
      page="Accepted Papers"
      heading="To be announced soon!"
      description="The list of accepted papers for ICAA 2027 will be posted here after the review process is complete."
    />
  );
};

export default AcceptedPapersPage;
