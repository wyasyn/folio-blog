import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const nowDate = new Date().toLocaleDateString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: nowDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: nowDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: nowDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: nowDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: nowDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://example.com",
      lastModified: nowDate,
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://example.com/image.jpg"],
    },
  ];
}
