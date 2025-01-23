"use client";
import React, { useState } from "react";

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
  description?: string;
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
    description: initialData.description || "",
    categories: initialData.categories || "",
  });

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
    >
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      {formData.body !== undefined && (
        <label>
          Body:
          <textarea name="body" value={formData.body} onChange={handleChange} />
        </label>
      )}
      {formData.description !== undefined && (
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      )}
      <label>
        Excerpt:
        <input
          type="text"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Categories (comma-separated):
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default Form;
