import { images } from "@/constants/2027/cloudinary_images";
import { Proceeding } from "@/lib/types";

export const PROCEEDINGS_DATA: Proceeding[] = [
  {
    year: 2026,
    title: "ICAA 2026 Proceedings",
    volume: "Volume 16423",
    editors:
      "Christos Zaroliagis, Dinabandhu Bhandari, Prosenjit Gupta, Swagatam Das (Eds.)",
    image: images.Springer2026,
    link: "https://link.springer.com/book/10.1007/978-3-032-15621-1",
    description:
      "The Proceedings of ICAA 2026 have been published as Volume 16423 of the Springer Verlag LNCS series.",
  },
  {
    year: 2025,
    title: "ICAA 2025 Proceedings",
    volume: "Volume 15505",
    editors: "Subhas C. Nandy, Rajat K. De, Prosenjit Gupta",
    image: images.Springer2025,
    link: "https://link.springer.com/book/10.1007/978-3-031-84543-7",
    description:
      "Proceedings of ICAA 2025 was published as Volume 15505 of the Springer Verlag LNCS series.",
  },
  {
    year: 2014,
    title: "ICAA 2014 Proceedings",
    volume: "Volume 8321",
    editors: "Prosenjit Gupta, Christos Zaroliagis",
    image: images.Springer2014,
    link: "https://link.springer.com/book/10.1007/978-3-319-04126-1",
    description:
      "Proceedings of ICAA 2014 was published as Volume 8321 of the Springer Verlag LNCS series.",
  },
];
