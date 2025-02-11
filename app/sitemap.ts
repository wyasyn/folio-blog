import { getImages } from "@/lib/actions/image";
import { getPaginatedBlogPosts } from "@/lib/actions/posts";
import { getPaginatedProjects } from "@/lib/actions/project";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const nowDate = new Date().toISOString();

const { projects } = await getPaginatedProjects();

const { blogPosts } = await getPaginatedBlogPosts();

const images = await getImages();

const projectPages = projects.map((project) => ({
  url: `${baseUrl}/portfolio/${project.slug}`,
  lastModified: project.updatedAt.toISOString(),
  changeFrequency: "weekly",
  priority: 0.8,
})) as MetadataRoute.Sitemap;

const blogPages = blogPosts.map((blogPost) => ({
  url: `${baseUrl}/single-blog/${blogPost.slug}`,
  lastModified: blogPost.updatedAt.toISOString(),
  changeFrequency: "weekly",
  priority: 0.8,
})) as MetadataRoute.Sitemap;

const imagePages = images?.map((image) => ({
  url: `${baseUrl}/photo/${image.id}`,
  lastModified: image.updatedAt.toISOString(),
  changeFrequency: "daily",
  priority: 0.6,
  images: [image.url],
})) as MetadataRoute.Sitemap;

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
    ...projectPages,
    ...blogPages,
    ...imagePages,
  ];
}
