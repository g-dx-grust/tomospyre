import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data/company";
import { services } from "@/lib/data/services";
import { jobs } from "@/lib/data/recruit";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/business",
    "/services",
    "/recruit",
    "/strengths",
    "/flow",
    "/disclosure",
    "/privacy",
    "/contact",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...jobs.map((j) => ({
      url: `${SITE_URL}/recruit/${j.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
