export type Announcement = {
  header: string;
  date: string;
  desc: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    header: "ICAA 27 Paper Submission Deadline",
    date: "August 17, 2026",
    desc: "Papers presenting original contributions related to the design, analysis, and implementation of algorithms are sought."
  },
  {
    header: "Welcome to ICAA 2027!",
    date: "Jan 06, 2027 - Jan 08, 2027",
    desc: "Welcome to the International Conference on Applied Algorithms (ICAA) 2027, at Heritage Institute of Technology, Kolkata!"
  },
  // {
  //   header: "Camera Ready Papers Due",
  //   date: "31 October, 2026",
  //   desc: "Submission of final camera-ready versions of accepted papers for the conference proceedings."
  // },
  // {
  //   header: "Early Bird Registration",
  //   date: "15 November, 2026",
  //   desc: "Early bird registration deadline for authors and attendees to avail special discounts."
  // }
];
