"use server";

import { FormData } from "@/components/Form";
import { prisma } from "../db";
import { makeSlug } from "../utils";

export const createPost = async ({
  title,
  excerpt,
  image,
  body,
  categories, // New parameter to handle categories as a comma-separated string
}: FormData) => {
  if (!title || !excerpt || !image || !body || !categories) {
    return { error: "All fields are required" };
  }

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
  if (!slug) {
    return { error: "Slug is required" };
  }
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
    return { error: `Failed to delete blog post with slug: ${slug}` };
  }
};

export async function getPaginatedBlogPosts(page = 1, pageSize = 4) {
  // Ensure valid pagination inputs
  const currentPage = Math.max(page, 1); // Minimum value is 1
  const validPageSize = Math.max(pageSize, 1); // Minimum value is 1
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated blog posts and total count in parallel
    const [blogPosts, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        skip,
        take: validPageSize,
        orderBy: { createdAt: "desc" },
        include: { categories: true },
      }),
      prisma.blogPost.count(),
    ]);

    // Calculate total pages only if there are blog posts
    const totalPages = total > 0 ? Math.ceil(total / validPageSize) : 0;

    return {
      blogPosts,
      pagination: {
        currentPage,
        totalPages,
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    throw new Error("An error occurred while fetching blog posts");
  }
}

export async function editBlogPost({
  id,
  title,
  excerpt,
  image,
  body,
  categories, // Comma-separated string of categories
}: {
  id: number;
  title?: string;
  excerpt?: string;
  image?: string;
  body?: string;
  categories?: string;
}) {
  try {
    // Validate that the blog post exists
    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!blogPost) {
      return { error: "Blog post not found" };
    }

    // Define the type for updated data
    type BlogPostUpdateInput = {
      title?: string;
      excerpt?: string;
      image?: string;
      body?: string;
      slug?: string;
      categories?: {
        set: { id: number }[];
      };
    };

    const updatedData: BlogPostUpdateInput = {};

    // Populate updatedData with the provided fields
    if (title) {
      updatedData.title = title;
      updatedData.slug = makeSlug(title);
    }
    if (excerpt) updatedData.excerpt = excerpt;
    if (image) updatedData.image = image;
    if (body) updatedData.body = body;

    // Handle categories
    if (categories) {
      const categoryNames = categories.split(",").map((c) => c.trim());
      const existingCategories = await Promise.all(
        categoryNames.map(async (categoryName) =>
          prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName, slug: makeSlug(categoryName) },
          })
        )
      );
      updatedData.categories = {
        set: existingCategories.map((category) => ({ id: category.id })),
      };
    }

    // Update the blog post
    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: updatedData,
    });

    return { message: "Blog post updated successfully", updatedBlogPost };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { error: "An error occurred while updating the blog post" };
  }
}

export const getBlogPostById = async (id: number) => {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!blogPost) {
      return { error: "Blog post not found", blogPost: null };
    }
    return {
      error: null,
      blogPost,
    };
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    throw new Error("An error occurred while fetching blog post");
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: { categories: true },
    });
    if (!blogPost) {
      return { error: "Blog post not found", blogPost: null };
    }
    return {
      error: null,
      blogPost,
    };
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    throw new Error("An error occurred while fetching blog post");
  }
};

export const getRelatedPosts = async (id: number, categoryIds: number[]) => {
  try {
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        NOT: { id },
        categories: {
          some: {
            id: {
              in: categoryIds,
            },
          },
        },
      },
      take: 3,
    });
    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw new Error("An error occurred while fetching related posts");
  }
};
