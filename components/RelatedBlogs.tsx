import { getRelatedPosts } from "@/lib/actions/posts";
import { BlogCard } from "./Blogcard";

export default async function RelatedBlogs({
  id,
  categoryIds,
}: {
  id: number;
  categoryIds: number[];
}) {
  const relatedBlogs = await getRelatedPosts(id, categoryIds);

  if (!relatedBlogs || relatedBlogs.length === 0) return;
  return (
    <section className="my-[5rem]">
      <h2 className="text-xl">Related Articles</h2>
      <div className="custom-grid mt-8">
        {relatedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            image={blog.image}
            body={blog.body}
            link={`/single-blog/${blog.slug}`}
            categories={blog.categories}
          />
        ))}
      </div>
    </section>
  );
}
