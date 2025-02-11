import { getImages } from "@/lib/actions/image";
import { ImageItem } from "./show-images";

export default async function ImageGallery() {
  const images = await getImages();
  if (!images) {
    return null; // Return null if no images are found. Otherwise, the component will render an empty grid.
  }

  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          id={image.id}
          url={image.url}
          altText={image.altText || "Image of Yasin"}
          width={image.width || 320}
          height={image.height || 320}
          blurDataUrl={image.blurDataUrl}
        />
      ))}
    </div>
  );
}
