import NotFound from "@/app/not-found";
import BackBtn from "@/components/BackBtn";
import Categories from "@/components/CategoriesBadges";
import { getBlogPostBySlug } from "@/lib/actions/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const { error, blogPost } = await getBlogPostBySlug(slug);
  if (error || !blogPost) NotFound();

  return {
    title: blogPost?.title,
    description: blogPost?.excerpt,
    openGraph: {
      title: blogPost?.title,
      description: blogPost?.excerpt,
      images: [{ url: blogPost?.image }],
    },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const { error, blogPost } = await getBlogPostBySlug(slug);
  if (error || !blogPost) NotFound();

  const categories = blogPost?.categories;

  return (
    <div>
      <div className="flex w-full items-center justify-end">
        <BackBtn />
      </div>

      <div className="prose dark:prose-invert">
        {blogPost?.body ? (
          <MDXRemote
            components={{
              Categories: (props) => (
                <Categories {...props} categories={categories} />
              ),
            }}
            source={blogPost.body}
          />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </div>
  );
}
