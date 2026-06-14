import { Hotel } from "@/lib/types";
import { images } from "./cloudinary_images";

export const HOTELS: Hotel[] = [
  {
    name: "Vivanta Kolkata EM Bypass",
    image: images.vivanta,
    address:
      "1930, Rash Behari Avnuee, Sector G, East Kolkata Township, Kolkata, West Bengal 700107",
    phone: "+91 33 6666 0000",
    website: "https://www.vivantahotels.com/en-in/hotels/vivanta-kolkata",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Vivanta%20Kolkata%20EM%20Bypass&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    name: "Regenta Orkos Kolkata",
    image: images.regenta,
    address:
      "621, Prantik Pally Rd, Ravindra Pally, Kasba, Kolkata, West Bengal 700107",
    phone: "+91 33 7125 9999",
    website: "https://app.mmyt.co/Xm2V/k3q9hvzg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Regenta%20Orkos%20Kolkata&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    name: "Eastern Metropolitan Club, Kolkata",
    image: images.emc,
    address: "A-73, Purba Diganta, Santoshpur, Kolkata, West Bengal 700075",
    phone: "+91 90078 75828",
    website: "https://www.emckolkata.org/",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Eastern%20Metropolitan%20Club%20Kolkata&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];