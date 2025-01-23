"use server";

import prisma from "../db";
import { makeSlug } from "../utils";

export const createPost = async ({
  title,
  excerpt,
  image,
  body,
  categories, // New parameter to handle categories as a comma-separated string
}: {
  title: string;
  excerpt: string;
  image: string;
  body: string;
  categories: string; // Comma-separated string of categories
}) => {
  const slug = makeSlug(title);

  try {
    // Split the categories string by commas and trim any extra spaces
    const categoryNames = categories
      .split(",")
      .map((category) => category.trim());

    // Find or create categories in the database
    const existingCategories = await Promise.all(
      categoryNames.map(async (categoryName) => {
        return await prisma.category.upsert({
          where: { name: categoryName },
          update: {},
          create: { name: categoryName, slug: makeSlug(categoryName) },
        });
      })
    );

    // Create the blog post and connect the categories
    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        image,
        body,
        slug,
        categories: {
          connect: existingCategories.map((category) => ({ id: category.id })),
        },
      },
    });

    return { message: "Post created successfully", post };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the post" };
  }
};

export const deleteBlogPost = async (slug: string) => {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blogPost) {
      return { error: "Blog post not found" };
    }

    // Delete the blog post
    await prisma.blogPost.delete({
      where: { slug },
    });

    return { message: "Blog post deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the blog post" };
  }
};

export async function getPaginatedBlogPosts(page = 1, pageSize = 4) {
  const skip = (page - 1) * pageSize;

  const [blogPosts, total] = await Promise.all([
    prisma.blogPost.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
      },
    }),
    prisma.blogPost.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    blogPosts,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      total,
    },
  };
}
