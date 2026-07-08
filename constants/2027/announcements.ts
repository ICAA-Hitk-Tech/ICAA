export type Announcement = {
  header: string;
  date: string;
  desc: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    header: "ICAA 27 Paper Submission Deadline",
    date: "Sept 01, 2026",
    desc: "Papers presenting original contributions related to the design, analysis, and implementation of algorithms are sought.",
  },
  {
    header: "ICAA 27 Proceedings",
    date: "08 July, 2026",
    desc: "Proceedings of ICAA 2027 will be published as part of the Springer Verlag LNCS volume.",
  },
  {
    header: "Welcome to ICAA 2027!",
    date: "Jan 06, 2027 - Jan 08, 2027",
    desc: "Welcome to the International Conference on Applied Algorithms (ICAA) 2027, at Heritage Institute of Technology, Kolkata!",
  },
];
