"use client";

import Image from "next/image";
import { useState } from "react";
import DeleteImageButton from "./DeleteImageButton";

export function ImageItem({
  image,
}: {
  image: { id: number; url: string; altText: string };
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  return (
    <div className="relative">
      <Image
        src={image.url || "/placeholder.svg"}
        alt={image.altText || "Uploaded image"}
        width={300}
        height={300}
        className="object-cover w-full h-64"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <p>{image.altText}</p>
        <DeleteImageButton
          imageId={image.id}
          onDelete={() => setIsDeleted(true)}
        />
      </div>
    </div>
  );
}
