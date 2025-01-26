import DeleteBlogBtn from "@/components/DeleteBlogBtn";
import FloatingBtn from "@/components/FloatingBtn";
import { PaginationMenu } from "@/components/Pagination";
import { getPaginatedBlogPosts } from "@/lib/actions/posts";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;
  const currentPage = parseInt(page ?? "1") || 1;
  const pageSize = 6; // Adjust as needed

  const data = await getPaginatedBlogPosts(currentPage, pageSize);

  if (!data || data.blogPosts.length === 0) {
    return (
      <h1 className="p-4 bg-secondary border rounded-lg mx-auto max-w-[500px]">
        No projects found
      </h1>
    );
  }

  return (
    <div>
      <h1 className="p-4 bg-secondary border rounded-lg mx-auto max-w-[500px] text-lg">
        Paginated Blogs ({data.pagination.currentPage} of{" "}
        {data.pagination.totalPages})
      </h1>
      <div className="my-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.blogPosts.map((blog) => (
          <div key={blog.id} className="p-4 max-w-[300px] border rounded-xl">
            <h2 className="text-2xl font-medium mb-2">
              {blog.title.length > 38
                ? `${blog.title.slice(0, 38)}...`
                : blog.title}
            </h2>
            <p className="text-sm">{blog.excerpt.slice(0, 60)}...</p>
            <div className="flex items-center justify-between gap-4 py-2">
              <Link
                href={`/admin/blog/edit/${blog.id}`}
                className="px-3 py-1 text-sky-400 hover:bg-secondary duration-300 rounded-lg"
              >
                Edit
              </Link>
              <DeleteBlogBtn slug={blog.slug} />
            </div>
          </div>
        ))}
      </div>

      <FloatingBtn link="/admin/blog/create-blog" />

      <div className="">
        {data.pagination.totalPages > 1 && (
          <PaginationMenu
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
          />
        )}
      </div>
    </div>
  );
}
