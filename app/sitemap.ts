import type { MetadataRoute } from "next";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // const currentDate = new Date();

  const routes = [
    {
      path: "",
      changeFrequency: "yearly" as const,
      priority: 1.0,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}`,
      changeFrequency: "weekly" as const,
      priority: 1.0,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/program`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/callforpapers`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/papersubmission`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/keynotespeakers`,
      changeFrequency: "monthly" as const,
      priority: 0.95,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/registration`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/impdates`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/organisers`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/acceptedpapers`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/proceedings`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/program_committee`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date("2026-06-15"),
    },
    {
      path: `/${ACTIVE_YEAR}/registrationfees`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: new Date("2026-06-15"),
    },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
