import type { Metadata } from "next";
import StubContents from "@/components/2027/StubContents";

export const metadata: Metadata = {
  title: "Proceedings",
  description:
    "ICAA conference proceedings — peer-reviewed papers published in collaboration with Springer LNCS.",
};

const ProceedingsPage = () => {
  return (
    <StubContents
      page="Proceedings"
      heading="To be announced soon!"
      description="Proceedings information for ICAA 2027 will be published here in due course."
    />
  );
};

export default ProceedingsPage;
