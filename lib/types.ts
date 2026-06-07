export type NavChild = { label: string; href: string };

export type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; children: NavChild[]; href?: never };
