"use client";
import Form, { FormData } from "@/components/Form";
import { createPost } from "@/lib/actions/posts";
import React from "react";
import toast from "react-hot-toast";
import AdminTitle from "./AdminTitle";
import { useRouter } from "next/navigation";

const CreateBlogPost: React.FC = () => {
  const router = useRouter();
  const createBlogPost = async (data: FormData) => {
    try {
      const { message, error } = await createPost(data);

      if (message) {
        toast.success(message);
        router.refresh();
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog post");

      console.error("Error creating blog post:", error);
    }
  };

  return (
    <>
      {" "}
      <AdminTitle title="Add Blog" />
      <Form onSubmit={createBlogPost} buttonText="Create Blog Post" />
    </>
  );
};

export default CreateBlogPost;
