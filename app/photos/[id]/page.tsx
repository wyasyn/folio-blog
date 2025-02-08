export const dynamicParams = false;
import { images } from "@/app/(root)/about/_components/Images";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const getImage = unstable_cache(async (id) => {
  const image = images.find((img) => img.id === Number.parseInt(id));
  if (!image) notFound();
  return image;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const image = await getImage(id);
  return {
    title: `Image ${id}`,
    description: `Image ${id} description`,
    openGraph: {
      title: `Image ${id}`,
      description: `Image ${id} description`,
      images: [{ url: image.src }],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const image = await getImage(id);
  return (
    <div className="grid place-items-center p-12">
      <Image
        src={image.src}
        className="object-cover rounded-xl shadow-sm object-center"
        alt="image 1"
        width={650}
        height={650}
      />
    </div>
  );
}
