"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Image as ImageLucide } from "lucide-react";

export default function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText);

    try {
      setIsLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFile(null);
        setAltText("");
        router.refresh();
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="file" className="block text-sm font-medium ">
          Image
        </label>
        <div className="w-[150px] gap-3 flex flex-col items-center justify-center aspect-square border rounded-lg border-dotted relative border-emerald-400/15 bg-emerald-400/5 p-3">
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 top-0 left-0 w-full h-full opacity-0 z-50"
          />
          <ImageLucide className="text-emerald-600" />
          <div className="text-xs text-center">
            {file
              ? file.name
              : "Drag and drop an image here or click to select one"}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="altText" className="block text-sm font-medium">
          Alt Text
        </label>
        <Input
          type="text"
          id="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </div>
      <Button variant="secondary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>loading...</>
        ) : (
          <>
            <ImageLucide /> Upload Image
          </>
        )}
      </Button>
    </form>
  );
}
