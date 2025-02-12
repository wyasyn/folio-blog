import { getImages } from "@/lib/actions/image";
import { getPaginatedBlogPosts } from "@/lib/actions/posts";
import { getPaginatedProjects } from "@/lib/actions/project";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

const nowDate = new Date().toISOString();

const staticPages: MetadataRoute.Sitemap = [
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
];

async function generateDynamicPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const [{ projects }, { blogPosts }, images] = await Promise.all([
      getPaginatedProjects(),
      getPaginatedBlogPosts(),
      getImages(),
    ]);

    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt.toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((blogPost) => ({
      url: `${baseUrl}/single-blog/${blogPost.slug}`,
      lastModified: blogPost.updatedAt.toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const imagePages: MetadataRoute.Sitemap =
      images?.map((image) => ({
        url: `${baseUrl}/photo/${image.id}`,
        lastModified: image.updatedAt.toISOString(),
        changeFrequency: "daily",
        priority: 0.6,
        images: [image.url],
      })) ?? [];

    return [...projectPages, ...blogPages, ...imagePages];
  } catch (error) {
    console.error("Error generating dynamic pages for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicPages = await generateDynamicPages();
  return [...staticPages, ...dynamicPages];
}
