import Image from "next/image";
import Link from "next/link";

export const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1520283818086-3f6dffb019c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    alt: "Image 5",
  },
];

export default function Images() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-12 auto-rows-[100px] sm:auto-rows-[200px] md:auto-rows-[150px] lg:auto-rows-[200px]">
      {images.map((image, index) => (
        <Link
          href={`/photos/${image.id}`}
          passHref
          key={image.src}
          className={`relative overflow-hidden rounded-md bg-secondary 
            ${index % 5 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} 
            md:${index % 3 === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"} 
            lg:${index % 4 === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </Link>
      ))}
    </div>
  );
}
