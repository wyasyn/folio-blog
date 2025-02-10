import Image from "next/image";
import React from "react";

export default async function OptimizedImage({
  url,
  altText,
  index,
}: {
  url: string;
  altText: string;
  index: number;
}) {
  const base64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAPElEQVR4nGPQ05JVV5Z48f65hbkOg72NoSwDw/P/772iQxnMLHQTkiJVzQ3lVaUYjJW53Q1liwvz7U1VAJD7DktNJvnzAAAAAElFTkSuQmCC";
  if (!base64) return null;
  return (
    <Image
      src={url}
      alt={altText}
      placeholder="blur"
      blurDataURL={base64}
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
