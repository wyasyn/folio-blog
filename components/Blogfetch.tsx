import { getPaginatedBlogPosts } from "@/lib/actions/posts";
import { BlogCard } from "./Blogcard";
import { PaginationMenu } from "./Pagination";

export default async function BlogFetch({
  currentPage,
  pageSize,
}: {
  currentPage: number;
  pageSize: number;
}) {
  const { blogPosts, pagination } = await getPaginatedBlogPosts(
    currentPage,
    pageSize
  );

  if (!blogPosts) {
    return <div>Error: No blog posts found.</div>;
  }
  return (
    <div>
      <div className="custom-grid">
        {blogPosts.length > 0 ? (
          blogPosts.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              body={blog.body}
              link={`/single-blog/${blog.slug}`}
              categories={blog.categories}
            />
          ))
        ) : (
          <div>No blog posts found.</div>
        )}
      </div>
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationMenu
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            basePath="/single-blog"
          />
        </div>
      )}
    </div>
  );
}
