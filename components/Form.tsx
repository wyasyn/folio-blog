"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
          <div>
            <input type="file" accept=".md,.mdx" onChange={handleFileChange} />
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
