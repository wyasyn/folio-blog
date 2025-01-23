import Form, { FormData } from "@/components/Form";
import React from "react";

const CreateBlogPost: React.FC = () => {
  const createBlogPost = async (data: FormData) => {
    try {
      const response = await fetch("/api/createBlogPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || "Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return <Form onSubmit={createBlogPost} buttonText="Create Blog Post" />;
};

export default CreateBlogPost;
