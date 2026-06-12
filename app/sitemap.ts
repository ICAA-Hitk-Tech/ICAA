import type { MetadataRoute } from "next";
import { ACTIVE_YEAR, SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/program`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/callforpapers`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/papersubmission`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/keynotespeakers`,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/registration`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/impdates`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/organisers`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/acceptedpapers`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/proceedings`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/program_committee`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${ACTIVE_YEAR}/registrationfees`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
