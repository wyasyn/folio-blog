"use server";

import { revalidatePath } from "next/cache";
import type { AboutFormData } from "@/types/about";
import { prisma } from "../db";

export async function submitAboutForm(data: AboutFormData) {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Upsert the main About entry (ensuring a single entry per user)
      const about = await prisma.about.upsert({
        where: { email: data.email }, // Ensure uniqueness by email
        update: {
          name: data.name,
          title: data.title,
          description: data.description,
          phone: data.phone,
          location: data.location,
          avatar: data.avatar,
        },
        create: {
          name: data.name,
          title: data.title,
          description: data.description,
          email: data.email,
          phone: data.phone,
          location: data.location,
          avatar: data.avatar,
        },
      });

      // Delete old related records
      await prisma.experience.deleteMany({ where: { aboutId: about.id } });
      await prisma.skill.deleteMany({ where: { aboutId: about.id } });
      await prisma.socialLink.deleteMany({ where: { aboutId: about.id } });
      await prisma.techStack.deleteMany({ where: { aboutId: about.id } });
      await prisma.hobby.deleteMany({ where: { aboutId: about.id } });
      await prisma.language.deleteMany({ where: { aboutId: about.id } });

      // Insert new experiences if provided
      if (data.experiences.length > 0) {
        await prisma.experience.createMany({
          data: data.experiences.map((exp) => ({
            aboutId: about.id,
            company: exp.company,
            position: exp.position,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description,
          })),
        });
      }

      // Insert new skills if provided
      if (data.skills.length > 0) {
        await prisma.skill.createMany({
          data: data.skills.map((skill) => ({
            aboutId: about.id,
            name: skill.name,
            level: skill.level,
          })),
        });
      }

      // Insert new social links if provided
      if (data.socialLinks.length > 0) {
        await prisma.socialLink.createMany({
          data: data.socialLinks.map((link) => ({
            aboutId: about.id,
            name: link.name,
            url: link.url,
          })),
        });
      }

      // Insert new tech stack items if provided
      if (data.techStack.length > 0) {
        await prisma.techStack.createMany({
          data: data.techStack.map((tech) => ({
            aboutId: about.id,
            name: tech.name,
            level: tech.level,
          })),
        });
      }

      // Insert new hobbies if provided
      if (data.hobbies.length > 0) {
        await prisma.hobby.createMany({
          data: data.hobbies.map((hobby) => ({
            aboutId: about.id,
            name: hobby.name,
          })),
        });
      }

      // Insert new languages if provided
      if (data.languages.length > 0) {
        await prisma.language.createMany({
          data: data.languages.map((lang) => ({
            aboutId: about.id,
            name: lang.name,
            fluency: lang.fluency,
          })),
        });
      }

      revalidatePath("/about");
      return { success: true, data: about };
    });
  } catch (error) {
    console.error("Failed to submit about form:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
