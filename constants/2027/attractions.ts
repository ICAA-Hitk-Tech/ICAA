import { images } from "./cloudinary_images";

export interface Attraction {
  url: string;
  title: string;
  desc: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    url: images.victoria,
    title: "Victoria Memorial",
    desc: "A magnificent white marble palace built between 1906 and 1921, blending British and Mughal architectures.",
  },
  {
    url: images.howrah,
    title: "Howrah Bridge",
    desc: "An iconic cantilever steel bridge linking Kolkata and Howrah, serving as a gateway to the city.",
  },
  {
    url: images.dakshineshwar,
    title: "Dakshineswar Kali Temple",
    desc: "A famous 19th-century temple complex built by Rani Rashmoni, situated on the bank of the Hooghly River.",
  },
  {
    url: images.tram,
    title: "Kolkata Tramway",
    desc: "Nostalgic electric streetcars winding through heritage routes, representing Asia's oldest operating tramway.",
  },
  {
    url: images.durga,
    title: "Durga Puja Carnival",
    desc: "Kolkata's signature autumn festival featuring spectacular art pandals, recognized by UNESCO.",
  },
  {
    url: images.taxi,
    title: "Yellow Ambassador Taxi",
    desc: "Iconic yellow retro cabs that are a vital and charming part of Kolkata's daily streetscape.",
  },
  {
    url: images.bridge,
    title: "Vidyasagar Setu",
    desc: "A modern cable-stayed bridge spanning Hooghly, offering breathtaking sunset views.",
  },
];
