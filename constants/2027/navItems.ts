import { ACTIVE_YEAR } from "@/lib/config";
import type { NavItem } from "@/lib/types";

export type { NavChild, NavItem } from "@/lib/types";

export const getNavItems = (year: number): NavItem[] => [
  { label: "Home", href: `/${year}` },
  {
    label: "Information",
    children: [
      { label: "Important Dates", href: `/${year}/impdates` },
      { label: "Keynote Speakers", href: `/${year}/keynotespeakers` },
      { label: "Organisers", href: `/${year}/organisers` },
      { label: "Program Committee", href: `/${year}/program_committee` },
      { label: "Program", href: `/${year}/program` },
    ],
  },
  {
    label: "Call for Papers",
    children: [
      { label: "Paper Submission", href: `/${year}/papersubmission` },
      { label: "Proceedings", href: `/${year}/proceedings` },
      { label: "Accepted Papers", href: `/${year}/acceptedpapers` },
    ],
  },
  {
    label: "Registration",
    children: [
      { label: "Registration", href: `/${year}/registration` },
      { label: "Registration Fees", href: `/${year}/registrationfees` },
    ],
  },
  {
    label: "Venue & Travel",
    children: [
      { label: "Venue", href: `/${year}/venue` },
      { label: "Accommodation", href: `/${year}/accommodation` },
      { label: "Travel & Local Info", href: `/${year}/travel_localinfo` },
      { label: "Visa Application", href: `/${year}/visa_application` },
    ],
  },
  { label: "Contact", href: `/${year}#contact` },
];

export const navItems = getNavItems(ACTIVE_YEAR);
