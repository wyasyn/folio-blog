import NotFound from "@/app/not-found";
import AdminTitle from "@/components/AdminTitle";
import BackBtn from "@/components/BackBtn";
import EditBlogPost from "@/components/editPost";
import { getBlogPostById } from "@/lib/actions/posts";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const { blogPost } = await getBlogPostById(parseInt(id));

  if (!blogPost) NotFound();
  return {
    title: blogPost?.title,
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const { blogPost, error } = await getBlogPostById(parseInt(id));

  if (error)
    return (
      <div className="mx-auto max-w-sm border-2 border-destructive/50 p-5 rounded-xl bg-destructive/15">
        <div className="flex items-center justify-end">
          <BackBtn />
        </div>
        <p className="mt-5">Error: {error}</p>
      </div>
    );

  if (!blogPost) {
    return;
  }

  const initialData = {
    title: blogPost.title,
    excerpt: blogPost?.excerpt,
    image: blogPost?.image,
    body: blogPost?.body,
    categories: blogPost?.categories
      .map((category) => category.name)
      .join(", "),
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
