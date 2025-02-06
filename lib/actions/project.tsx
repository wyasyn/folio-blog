"use server";

import { FormData } from "@/components/Form";
import { prisma } from "../db";
import { makeSlug } from "../utils";

export const createProject = async ({
  title,
  excerpt,
  image,
  body,
  categories, // Categories as a comma-separated string
}: FormData) => {
  if (!title || !excerpt || !image || !body || !categories) {
    return { error: "All fields are required" };
  }
  const slug = makeSlug(title);

  const existingAbout = await prisma.about.findFirst();

  if (!existingAbout) {
    return { error: "About section is not found" };
  }
  const aboutId = existingAbout.id;

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
        aboutId: aboutId,
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
    return { error: `Failed to delete Project with slug: ${slug}` };
  }
};

export async function getPaginatedProjects(page = 1, pageSize = 4) {
  // Ensure valid pagination inputs
  const currentPage = Math.max(page, 1); // Minimum value is 1
  const validPageSize = Math.max(pageSize, 1); // Minimum value is 1
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated projects and total count in parallel
    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        skip,
        take: validPageSize,
        orderBy: { createdAt: "desc" },
        include: { categories: true },
      }),
      prisma.project.count(),
    ]);

    // Calculate total pages only if there are projects
    const totalPages = total > 0 ? Math.ceil(total / validPageSize) : 0;

    return {
      projects,
      pagination: {
        currentPage,
        totalPages,
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    throw new Error("An error occurred while fetching projects");
  }
}

export const editProject = async ({
  id,
  title,
  excerpt,
  body,
  image,
  categories, // Comma-separated string of categories
}: {
  id: number; // Assume projects are identified by a unique ID
  title?: string;
  excerpt?: string;
  body?: string;
  image?: string;
  categories?: string;
}) => {
  try {
    // Validate that the project exists
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return { error: "Project not found" };
    }

    // Define the type for updated data
    type ProjectUpdateInput = {
      title?: string;
      excerpt?: string;
      body?: string;
      image?: string;
      categories?: {
        set: { id: number }[];
      };
    };

    const updatedData: ProjectUpdateInput = {};

    // Populate updatedData with the provided fields
    if (title) updatedData.title = title;
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

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updatedData,
    });

    return { message: "Project updated successfully", updatedProject };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "An error occurred while updating the project" };
  }
};

export const getProjectById = async (id: number) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!project) {
      return { error: "Project not found", project: null };
    }
    return {
      error: null,
      project,
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw new Error("An error occurred while fetching project");
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { categories: true },
    });
    if (!project) {
      return { error: "Project not found", project: null };
    }
    return {
      error: null,
      project,
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw new Error("An error occurred while fetching project");
  }
};

export const getRelatedProjects = async (id: number, categoryIds: number[]) => {
  try {
    const relatedProjects = await prisma.project.findMany({
      where: {
        id: { not: id },
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
      },
      take: 3, // Limit to 3 related projects
    });
    return relatedProjects;
  } catch (error) {
    console.error("Error fetching related projects:", error);
    throw new Error("An error occurred while fetching related projects");
  }
};

export const getProjectsByCategory = async (
  categorySlug: string,
  page = 1,
  pageSize = 4
) => {
  // Ensure valid pagination inputs
  const currentPage = Math.max(page, 1); // Minimum value is 1
  const validPageSize = Math.max(pageSize, 1); // Minimum value is 1
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated projects and total count in parallel
    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        skip,
        take: validPageSize,
        orderBy: { createdAt: "desc" },
        include: { categories: true },
        where: {
          categories: {
            some: {
              slug: categorySlug,
            },
          },
        },
      }),
      prisma.project.count({
        where: {
          categories: {
            some: {
              slug: categorySlug,
            },
          },
        },
      }),
    ]);

    // Calculate total pages only if there are projects
    const totalPages = total > 0 ? Math.ceil(total / validPageSize) : 0;

    return {
      projects,
      pagination: {
        currentPage,
        totalPages,
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    throw new Error("An error occurred while fetching projects by category");
  }
};
