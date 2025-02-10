import { getImages } from "@/lib/actions/image";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

export default async function Images() {
  const images = await getImages();
  if (!images) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-12 auto-rows-[100px] sm:auto-rows-[200px] md:auto-rows-[150px] lg:auto-rows-[200px] grid-flow-dense">
      {images.map((image, index) => (
        <Link
          href={`/photo/${image.id}`}
          passHref
          key={image.url}
          className={`relative overflow-clip transition-all duration-300 group hover:shadow-lg rounded-md bg-secondary 
            ${index % 5 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} 
            md:${index % 3 === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"} 
            lg:${index % 4 === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"}`}
        >
          <OptimizedImage
            url={image.url || "/placeholder-image.jpg"}
            altText={image.altText || "Yasyn image"}
            index={index}
          />
        </Link>
      ))}
    </div>
  );
}
