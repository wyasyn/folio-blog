export const dynamicParams = false;
import { getImageById, getImages } from "@/lib/actions/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 604800;

export async function generateStaticParams() {
  const images = await getImages();
  if (!images) notFound();
  return images.map((image) => ({
    id: `${image.id}`,
  }));
}

const getImage = cache(async (id: number) => {
  const image = await getImageById(id);
  if (!image) notFound();
  return image;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const image = await getImage(Number.parseInt(id));
  return {
    title: image.altText,
    description: image.altText,
    openGraph: {
      title: `Image ${id}`,
      description: image.altText,
      images: [{ url: image.url }],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const image = await getImage(Number.parseInt(id));

  return (
    <div
      className="grid place-items-center min-h-screen relative"
      style={{
        backgroundImage: `url('${image.blurDataUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={image.url}
        className="object-cover my-auto rounded-xl shadow-sm object-center h-[75vh] w-auto"
        alt="image 1"
        width={image.width || 650}
        height={image.height || 650}
        priority
        blurDataURL={image.blurDataUrl}
        placeholder="blur"
      />
    </div>
  );
}
