import { ReactNode } from "react";

export type NavChild = { label: string; href: string };

export type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; children: NavChild[]; href?: never };

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