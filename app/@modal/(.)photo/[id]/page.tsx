"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "@/app/(root)/about/_components/modal";
import { getImageById, getImages } from "@/lib/actions/image";
import { use } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const photoId = parseInt(id);

  const [images, setImages] = useState<
    {
      id: number;
      url: string;
      width: number;
      height: number;
      blurDataUrl: string;
    }[]
  >([]);
  const [currentImage, setCurrentImage] = useState<{
    id: number;
    url: string;
    width: number;
    height: number;
    blurDataUrl: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const allImages = await getImages();
      const image = await getImageById(photoId);
      if (!image || !allImages) return router.push("/about");

      setImages(
        allImages.filter(
          (img) => img.width !== null && img.height !== null
        ) as {
          id: number;
          url: string;
          width: number;
          height: number;
          blurDataUrl: string;
        }[]
      );
      if (image.width !== null && image.height !== null) {
        setCurrentImage({
          id: image.id,
          url: image.url,
          width: image.width,
          height: image.height,
          blurDataUrl: image.blurDataUrl,
        });
      }
    }
    fetchData();
  }, [photoId, router]);

  if (!currentImage) return null;

  const currentIndex = images.findIndex((img) => img.id === photoId);
  const lastIndex = images.length - 1;

  // Determine next and previous images with looping
  const prevImage = images[currentIndex === 0 ? lastIndex : currentIndex - 1];
  const nextImage = images[currentIndex === lastIndex ? 0 : currentIndex + 1];

  const goToImage = (id: number) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      <Modal>
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={() => goToImage(prevImage.id)}
              className="absolute left-2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              ← Prev
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage.id} // Ensure animation triggers on image change
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={currentImage.url}
                alt={`Image ${currentImage.id}`}
                width={currentImage.width || 640}
                height={currentImage.height || 640}
                placeholder="blur"
                blurDataURL={currentImage.blurDataUrl}
                sizes="(max-width: 640px) 100vw, 
                  (max-width: 768px) 50vw, 
                  (max-width: 1024px) 33vw, 
                  25vw"
                priority
                className="object-cover object-center rounded-lg w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={() => goToImage(nextImage.id)}
              className="absolute right-2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              Next →
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
