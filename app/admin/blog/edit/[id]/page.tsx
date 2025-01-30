import NotFound from "@/app/not-found";
import AdminTitle from "@/components/AdminTitle";
import EditBlogPost from "@/components/editPost";
import { getBlogPostById } from "@/lib/actions/posts";
import { unstable_cache } from "next/cache";

type Params = Promise<{ id: string }>;

const getCachedBlog = unstable_cache(async (id: string) => {
  const { blogPost } = await getBlogPostById(parseInt(id));
  if (!blogPost) NotFound();
  return blogPost;
});
export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const blogPost = await getCachedBlog(id);

  if (!blogPost) NotFound();
  return {
    title: blogPost?.title,
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const blogPost = await getCachedBlog(id);

  const initialData = {
    title: blogPost?.title || "",
    excerpt: blogPost?.excerpt || "",
    image: blogPost?.image || "",
    body: blogPost?.body || "",
    categories:
      blogPost?.categories.map((category) => category.name).join(", ") || "",
  };

  return (
    <div>
      <AdminTitle title="Edit Project" />
      <div>
        <EditBlogPost id={parseInt(id)} blogPost={initialData} />
      </div>
    </div>
  );
}
