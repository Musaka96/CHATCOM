import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chathelper.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/alerts",
    "/scripts",
    "/setup",
    "/teams",
    "/pricing",
    "/terms",
    "/privacy",
    "/refunds",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
