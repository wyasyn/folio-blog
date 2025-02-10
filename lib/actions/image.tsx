"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImage(id: number) {
  try {
    // Fetch the image from the database
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      throw new Error("Image not found");
    }

    // Extract the public_id from the Cloudinary URL
    const publicId = image.url.split("/").pop()?.split(".")[0];

    if (!publicId) {
      throw new Error("Invalid Cloudinary URL");
    }

    // Delete the image from Cloudinary
    await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    // Delete the image from the database
    await prisma.image.delete({
      where: { id },
    });

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, message: "Failed to delete image" };
  }
}

export const getImages = async () => {
  try {
    const images = prisma.image.findMany();
    return images;
  } catch (error) {
    console.log(error);
  }
};

export const getImageById = async (id: number) => {
  try {
    const image = prisma.image.findUnique({
      where: { id },
    });
    return image;
  } catch (error) {
    console.log(error);
  }
};
