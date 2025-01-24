"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import MdIcon from "@/assets/substance.png";
import Image from "next/image";

interface FormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: FormData;
  buttonText: string;
}

export interface FormData {
  title: string;
  excerpt?: string;
  image?: string;
  body?: string;

  categories: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  initialData = {},
  buttonText,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData.title || "",
    excerpt: initialData.excerpt || "",
    image: initialData.image || "",
    body: initialData.body || "",
    categories: initialData.categories || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (
      file &&
      (file.type === "text/markdown" ||
        file.name.endsWith(".mdx") ||
        file.name.endsWith(".md"))
    ) {
      const reader = new FileReader();

      reader.onload = () => {
        // The file content is available as a string in reader.result
        setFormData((prev) => ({ ...prev, body: reader.result as string }));
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid .md or .mdx file");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "0 auto" }}
      className="flex flex-col gap-3 py-12 px-2 border rounded-lg"
    >
      <label className="flex flex-col gap-2">
        Title:
        <input
          type="text"
          name="title"
          className="bg-secondary w-full p-2 rounded-lg border focus-within:border-primary/50 outline-none"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      {formData.body !== undefined && (
        <label className="flex flex-col gap-3">
          Body:
          <div className="relative w-full max-w-[250px] cursor-pointer aspect-square md:aspect-video bg-secondary rounded-xl border grid place-items-center border-dotted mx-auto">
            <div className="flex flex-col gap-3 items-center justify-center text-center p-3">
              <Image
                src={MdIcon.src}
                alt="md icon"
                width={MdIcon.width}
                height={MdIcon.height}
                className="w-10 h-10 object-contain"
              />
              <p className="text-xs">
                Drag and drop your Markdown (.md,.mdx) file here or click to
                select it.
                {formData.body && (
                  <span className="text-sm text-primary">
                    Preview: {formData.body.slice(0, 30)}...
                  </span>
                )}
              </p>
            </div>

            <input
              className="absolute inset-0 z-1 opacity-0 cursor-pointer"
              type="file"
              accept=".md,.mdx"
              onChange={handleFileChange}
            />
          </div>
        </label>
      )}
      <label className="flex flex-col gap-3">
        Excerpt:
        <textarea
          rows={4}
          name="excerpt"
          className="bg-secondary w-full p-2 rounded-lg border focus-within:border-primary/50 outline-none"
          value={formData.excerpt}
          onChange={handleChange}
        />
      </label>
      <label className="flex flex-col gap-3">
        Image URL:
        <input
          type="url"
          name="image"
          className="bg-secondary w-full p-2 rounded-lg border focus-within:border-primary/50 outline-none"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <label className="flex flex-col gap-3">
        Categories (comma-separated):
        <input
          type="text"
          name="categories"
          className="bg-secondary w-full p-2 rounded-lg border focus-within:border-primary/50 outline-none"
          value={formData.categories}
          onChange={handleChange}
        />
      </label>
      <button className="submit-btn" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
