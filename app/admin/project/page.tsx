import DeleteProjectBtn from "@/components/deleteProjectBtn";
import FloatingBtn from "@/components/FloatingBtn";
import { PaginationMenu } from "@/components/Pagination";
import { getPaginatedProjects } from "@/lib/actions/project";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;
  const currentPage = parseInt(page ?? "1") || 1;
  const pageSize = 6; // Adjust as needed

  const data = await getPaginatedProjects(currentPage, pageSize);

  if (!data || data.projects.length === 0) {
    return (
      <h1 className="p-4 bg-secondary border rounded-lg mx-auto max-w-[500px]">
        No projects found
      </h1>
    );
  }

  return (
    <div>
      <h1 className="p-4 bg-secondary border rounded-lg mx-auto max-w-[500px] text-lg">
        Paginated Projects ({data.pagination.currentPage} of{" "}
        {data.pagination.totalPages})
      </h1>
      <div className="my-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.projects.map((project) => (
          <div key={project.id} className="p-4 max-w-[300px] border rounded-xl">
            <h2 className="text-2xl font-medium mb-2">
              {project.title.length > 30
                ? `${project.title.slice(0, 40)}...`
                : project.title}
            </h2>
            <p className="text-sm">{project.excerpt.slice(0, 60)}...</p>
            <div className="flex items-center justify-between gap-4 py-2">
              <Link
                href={`/admin/project/edit/${project.id}`}
                className="px-3 py-1 text-sky-400 hover:bg-secondary duration-300 rounded-lg"
              >
                Edit
              </Link>
              <DeleteProjectBtn slug={project.slug} />
            </div>
          </div>
        ))}
      </div>

      <FloatingBtn link="/admin/project/create-project" />

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
