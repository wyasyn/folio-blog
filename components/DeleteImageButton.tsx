"use client";

import { deleteImage } from "@/lib/actions/image";
import { useState } from "react";

interface DeleteImageButtonProps {
  imageId: number;
  onDelete: () => void;
}

export default function DeleteImageButton({
  imageId,
  onDelete,
}: DeleteImageButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteImage(imageId);
      if (result.success) {
        onDelete();
      } else {
        console.error(result.message);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {isDeleting ? "Deleting..." : "Delete Image"}
    </button>
  );
}
