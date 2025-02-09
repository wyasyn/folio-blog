"use client";

import Image from "next/image";
import { useState } from "react";
import DeleteImageButton from "./DeleteImageButton";

export function ImageItem({
  id,
  url,
  altText,
  width,
  height,
}: {
  id: number;
  url: string;
  altText: string;
  width: number;
  height: number;
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  return (
    <div className="relative rounded-lg">
      <Image
        src={url || "/placeholder.svg"}
        alt={altText || "Uploaded image"}
        width={width}
        height={height}
        className="object-cover w-full h-64 rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        <p>{altText}</p>
        <DeleteImageButton imageId={id} onDelete={() => setIsDeleted(true)} />
      </div>
    </div>
  );
}
