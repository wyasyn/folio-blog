import Image from "next/image";
import React from "react";

export default async function OptimizedImage({
  url,
  altText,
  index,
  blurDataURL,
}: {
  url: string;
  altText: string;
  index: number;
  blurDataURL: string;
}) {
  return (
    <Image
      src={url}
      alt={altText}
      placeholder="blur"
      blurDataURL={blurDataURL}
      fill
      className="rounded-md group-hover:scale-105 transition-all duration-300 object-cover"
      sizes="(max-width: 640px) 100vw, 
                (max-width: 768px) 50vw, 
                (max-width: 1024px) 33vw, 
                25vw"
      priority={index <= 4}
      quality={85}
    />
  );
}
