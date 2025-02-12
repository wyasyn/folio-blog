import { getImageById, getImages } from "@/lib/actions/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache, Suspense } from "react";

export const dynamicParams = false;
export const revalidate = 604800; // 1 week

const getImage = cache(async (id: number) => {
  try {
    const image = await getImageById(id);
    if (!image) throw new Error("Image not found");
    return image;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
});

export async function generateStaticParams() {
  const images = await getImages();
  if (!images) return [];
  return images.map((image) => ({
    id: `${image.id}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const image = await getImage(Number.parseInt(id));
  if (!image) notFound();

  return {
    title: `${image.altText} | My Photo Gallery`,
    description: image.altText || "No description available",
    openGraph: {
      title: `Image ${id} | My Photo Gallery`,
      description: image.altText || undefined,
      images: [
        {
          url: image.url,
          width: image.width || 360,
          height: image.height || 360,
          alt: image.altText || "image",
        },
      ],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getImage(Number.parseInt(id));
  if (!image) notFound();

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('${image.blurDataUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30" />
      <Suspense
        fallback={
          <div className="animate-pulse bg-gray-200 rounded-xl h-[75vh] w-full max-w-5xl" />
        }
      >
        <div className="relative w-full h-[75vh] max-w-5xl rounded-xl overflow-hidden z-10">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.altText || "Image"}
            width={image.width || 1920}
            height={image.height || 1080}
            className="object-contain w-full h-full rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          />
        </div>
      </Suspense>
      <div className="mt-4 text-center z-10">
        <h1 className="text-2xl font-bold text-white">{image.altText}</h1>
        <p className="text-sm text-gray-200">Image ID: {id}</p>
      </div>
    </div>
  );
}
