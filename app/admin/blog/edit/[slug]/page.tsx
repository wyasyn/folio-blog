import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form, { FormData } from "@/components/Form";

const EditBlogPost: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const [blogPost, setBlogPost] = useState<FormData | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/getBlogPost?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => setBlogPost(data))
        .catch((error) => console.error("Error fetching blog post:", error));
    }
  }, [slug]);

  const editBlogPost = async (data: FormData) => {
    try {
      const response = await fetch(`/api/editBlogPost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug }),
      });

      const result = await response.json();
      alert(result.message || "Blog post updated successfully!");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  return blogPost ? (
    <Form
      onSubmit={editBlogPost}
      initialData={blogPost}
      buttonText="Edit Blog Post"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default EditBlogPost;
