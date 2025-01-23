import Form, { FormData } from "@/components/Form";
import { editBlogPost } from "@/lib/actions/posts";
import toast from "react-hot-toast";

interface BlogPostProps {
  title: string;
  excerpt: string | undefined;
  image: string | undefined;
  body: string | undefined;
  description: string | undefined;
  categories: string;
}

function EditBlogPost({
  slug,
  blogPost,
}: {
  slug: string;
  blogPost: BlogPostProps;
}) {
  const editBlogPostFunc = async (data: FormData) => {
    try {
      const { message, error } = await editBlogPost({ ...data, slug });

      if (message) {
        toast.success(message);
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog post");
      console.error("Error updating blog post:", error);
    }
  };

  return (
    <Form
      onSubmit={editBlogPostFunc}
      initialData={blogPost}
      buttonText="Edit Blog Post"
    />
  );
}

export default EditBlogPost;
