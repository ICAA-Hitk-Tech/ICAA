import { CARD } from "@/constants/2027/attractions";
import { ReactNode } from "react";

export type NavChild = { label: string; href: string };

export type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; children: NavChild[]; href?: never };

export interface StubProps {
  page: string;
  heading: string;
  description: string;
}

export interface InfoCardProps {
  icon: ReactNode;
  headerLabel: string;
  accentClass: string;
  diamondClass: string;
  tags: readonly string[];
  bodyText: string;
  footer?: ReactNode;
}

export interface TagPillProps {
  label: string;
}

export interface Hotel {
  name: string;
  image: string;
  address: string;
  phone: string;
  website: string;
  mapEmbedUrl: string;
}

export interface HotelCardProps {
  index: number;
  hotel: Hotel;
  isActive: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface MapLayout {
  name: string;
  mapEmbedUrl: string;
}

export interface Attraction {
  url: string;
  title: string;
  desc: string;
}

export interface ImportantDate {
  event: string;
  date: string;
  note?: string;
  isPassed?: boolean;
}

export interface KeynoteSpeaker {
  name: string;
  university: string;
  image: string;
  profileUrl: string;
}

export interface ProgramCommitteeMember {
  name: string;
  institution: string;
  role?: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
}

export type CoverflowCardDimensions = CoverflowCardSizes[keyof CoverflowCardSizes];

export type CoverflowCardSizes = typeof CARD;

export interface CoverflowImageProps {
  index: number;
  rotateY: number;
  xOffset: number;
  zOffset: number;
  scale: number;
  opacity: number;
  card: CoverflowCardDimensions;
  cardBlur: string;
  d: number;
  isCenter: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  img: GalleryImage;
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface CardTransform {
  xOffset: number;
  rotateY: number;
  zOffset: number;
  scale: number;
  opacity: number;
  cardBlur: string;
}

export interface ToastProps {
  toastMessage: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface Proceeding {
  year: number;
  title: string;
  volume: string;
  editors: string;
  image: string;
  link: string;
  description: string;
}