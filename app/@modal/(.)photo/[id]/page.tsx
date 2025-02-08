import { unstable_cache } from "next/cache";

import { notFound } from "next/navigation";
import Image from "next/image";
import { images } from "@/app/(root)/about/_components/Images";
import { Modal } from "@/app/(root)/about/_components/modal";

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
export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const image = await getImage(photoId);
  return (
    <Modal>
      <div>
        <Image
          src={image.src}
          alt="image 4"
          width={640}
          height={640}
          className="object-cover object-center rounded-lg w-full h-full"
        />
      </div>
    </Modal>
  );
}
