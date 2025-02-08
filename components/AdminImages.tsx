import { getImages } from "@/lib/actions/image";
import { ImageItem } from "./show-images";

export default async function ImageGallery() {
  const images = await getImages();
  if (!images) {
    return null; // Return null if no images are found. Otherwise, the component will render an empty grid.
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={{ ...image, altText: image.altText || "" }}
        />
      ))}
    </div>
  );
}
