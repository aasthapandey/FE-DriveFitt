import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drivefitt.club";

  // Static pages
  const staticPages = [
    "",
    "/cricket",
    "/fitness",
    "/recovery",
    "/running",
    "/franchise",
    "/contact-us",
    "/terms",
    "/privacy",
    "/licenses",
    "/coming-soon",
  ];

  const routes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority:
      route === ""
        ? 1
        : route === "/contact-us" || route === "/franchise"
        ? 0.9
        : 0.8,
  }));

  return routes;
}
