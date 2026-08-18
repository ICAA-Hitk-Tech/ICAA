import { KeynoteSpeaker } from "@/lib/types";
import { images } from "@/constants/2027/cloudinary_images";

export const KEYNOTE_SPEAKERS_HEADING = "Keynote Speakers";

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    name: "Prof. Sourav Chakraborty",
    university: "Indian Statistical Institute, Kolkata, India",
    image: images.Sourav,
    profileUrl: "https://www.isical.ac.in/~sourav/",
    // talkTitle: "Approximation Frontiers in Network Routing Problems",
    bannerImage: images.isi,
  },
  {
    name: "Prof. Janos Pach",
    university: "Rényi Institute Budapest (Hungary) and EPFL (Switzerland)",
    image: images.Janos,
    profileUrl: "https://en.wikipedia.org/wiki/J%C3%A1nos_Pach",
    // talkTitle: "Computational Geometry in Modern Geographic Systems",
    bannerImage: images.reyni,
  },
];
