import Form, { FormData } from "@/components/Form";
import { createPost } from "@/lib/actions/posts";
import React from "react";
import toast from "react-hot-toast";

const CreateBlogPost: React.FC = () => {
  const createBlogPost = async (data: FormData) => {
    try {
      const { message, error } = await createPost(data);

      if (message) {
        toast.success(message);
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog post");

      console.error("Error creating blog post:", error);
    }
  };

  return <Form onSubmit={createBlogPost} buttonText="Create Blog Post" />;
};

export default CreateBlogPost;
