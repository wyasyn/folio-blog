"use server";

import prisma from "../db";
import { makeSlug } from "../utils";

export const createProject = async ({
  title,
  excerpt,
  image,
  body,
  categories, // Categories as a comma-separated string
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

    // Create the project and connect the categories
    const project = await prisma.project.create({
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

    return { message: "Project created successfully", project };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the project" };
  }
};

export const deleteProject = async (slug: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return { error: "Project not found" };
    }

    // Delete the project
    await prisma.project.delete({
      where: { slug },
    });

    return { message: "Project deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the project" };
  }
};

export async function getPaginatedProjects(page = 1, pageSize = 4) {
  const skip = (page - 1) * pageSize;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
      },
    }),
    prisma.project.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    projects,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      total,
    },
  };
}
