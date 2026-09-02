import { KeynoteSpeaker } from "@/lib/types";
import { images } from "@/constants/2027/cloudinary_images";

export const KEYNOTE_SPEAKERS_HEADING = "Keynote Speakers";

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    name: "János Pach",
    university: "Rényi Institute Budapest (Hungary) <br>and EPFL (Switzerland)",
    image: images.Janos,
    profileUrl: "https://en.wikipedia.org/wiki/J%C3%A1nos_Pach",
    // talkTitle: "Computational Geometry in Modern Geographic Systems",
    bannerImage: images.reyni,
  },
  {
    name: "Sourav Chakraborty",
    university: "Indian Statistical Institute, Kolkata, India",
    image: images.Sourav,
    profileUrl: "https://www.isical.ac.in/~sourav/",
    // talkTitle: "Approximation Frontiers in Network Routing Problems",
    bannerImage: images.isi,
  },
  {
    name: "Sumanta Ghosh",
    university: "Indian Statistical Institute, Kolkata, India",
    image: images.sumanta,
    profileUrl: "https://sites.google.com/view/sumghosh/home",
    // talkTitle: "Computational Geometry in Modern Geographic Systems",
    bannerImage: images.isi,
  },
  {
    name: "Maharaj Mukherjee",
    university: "Bank of America, New York, USA",
    image: images.maharaj,
    profileUrl: "https://www.linkedin.com/in/maharaj-mukherjee-4307561/",
    // talkTitle: "Computational Geometry in Modern Geographic Systems",
    bannerImage: images.bank,
    isOnline: true,
  },
  {
    name: "Danilo Pelusi",
    university: "University of Teramo, Italy",
    image: images.daniel,
    profileUrl: "https://www.unite.it/UniTE/Home/Docenti/Docente/Doc/dpelusi",
    // talkTitle: "Computational Geometry in Modern Geographic Systems",
    bannerImage: images.teramo,
    isOnline: true,
  },
];
