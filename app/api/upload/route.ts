import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/db";
import { getBase64ImageUrl } from "@/lib/generateBlurPlaceholder";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const altText = formData.get("altText") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Upload failed"));
          }
        );
        uploadStream.end(buffer);
      }
    );

    const aboutInfo = await prisma.about.findFirst();
    if (!aboutInfo) {
      throw new Error("About info not found");
    }

    const { secure_url, width, height, public_id } = uploadResult;

    const blurDataUrl = await getBase64ImageUrl(public_id);

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
