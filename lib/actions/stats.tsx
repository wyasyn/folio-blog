"use server";

import { prisma } from "../db";

// Function to get the total number of projects
async function getTotalProjects() {
  const totalProjects = await prisma.project.count();
  return totalProjects;
}

// Function to get the total number of blog posts
async function getTotalBlogPosts() {
  const totalBlogPosts = await prisma.blogPost.count();
  return totalBlogPosts;
}

// Function to get the total number of categories
async function getTotalCategories() {
  const totalCategories = await prisma.category.count();
  return totalCategories;
}

// Function to get the number of blog posts in each category
async function getBlogPostsPerCategory() {
  const blogPostsPerCategory = await prisma.category.findMany({
    select: {
      name: true,
      blogPosts: {
        select: {
          id: true, // Selecting id will help count the number of blog posts
        },
      },
    },
  });

  return blogPostsPerCategory.map((category) => ({
    categoryName: category.name,
    blogPostCount: category.blogPosts.length, // Count blog posts by length
  }));
}

// Function to get the number of projects in each category
async function getProjectsPerCategory() {
  const projectsPerCategory = await prisma.category.findMany({
    select: {
      name: true,
      projects: {
        select: {
          id: true, // Selecting id will help count the number of projects
        },
      },
    },
  });

  return projectsPerCategory.map((category) => ({
    categoryName: category.name,
    projectCount: category.projects.length, // Count projects by length
  }));
}

// Example usage
export async function getStats() {
  const totalProjects = await getTotalProjects();
  const totalBlogPosts = await getTotalBlogPosts();
  const totalCategories = await getTotalCategories();
  const blogPostsPerCategory = await getBlogPostsPerCategory();
  const projectsPerCategory = await getProjectsPerCategory();

  const Stats = {
    totalProjects,
    totalBlogPosts,
    totalCategories,
    blogPostsPerCategory,
    projectsPerCategory,
  };
  return Stats;
}
