import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    if (typeof uploadResult !== "object" || !uploadResult) {
      throw new Error("Invalid upload result");
    }

    const aboutInfo = await prisma.about.findFirst();
    if (!aboutInfo) {
      throw new Error("About info not found");
    }

    const { secure_url, width, height, public_id, blurDataUrl } =
      uploadResult as {
        secure_url: string;
        width: number;
        height: number;
        public_id: string;
        blurDataUrl: string;
      };

    const image = await prisma.image.create({
      data: {
        url: secure_url,
        altText,
        width,
        height,
        aboutId: aboutInfo.id,
        publicId: public_id,
        blurDataUrl,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
