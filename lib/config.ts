export const ACTIVE_YEAR = 2027;
export const PREVIOUS_YEARS = [2014, 2025, 2026];
export const SITE_URL = process.env.SITE_URL;

// Custom external/internal links for each conference year
export const YEAR_LINKS: Record<number, string> = {
  2014: "https://web.archive.org/web/20140319144916/https://sites.google.com/site/icaa2014/home",
  2025: "https://icaa2025.framer.website/",
  2026: "https://icaa2026.framer.website/",
};
