import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desiteproducts.com";
  const now = new Date();

  const paths = [
    "/",
    "/shipping-quote",
    "/thank-you",
    "/models/108-proscreen",
    "/models/78-proscreen",
    "/models/68-proscreen",
    "/models/slg-108",
    "/models/slg-78",
    "/models/slg-56",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
