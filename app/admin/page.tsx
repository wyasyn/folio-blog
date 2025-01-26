import { getStats } from "@/lib/actions/stats";

export default async function page() {
  const stats = await getStats();

  return (
    <div className="md:pt-12">
      <div className="grid gap-3 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-secondary p-3 rounded-lg border">
          Total Projects:{" "}
          <span className="font-semibold text-lg ml-3">
            {stats.totalProjects}
          </span>
        </div>
        <div className="bg-secondary p-3 rounded-lg border">
          Total Blog Posts:{" "}
          <span className="font-semibold text-lg ml-3">
            {stats.totalBlogPosts}
          </span>
        </div>
        <div className="bg-secondary p-3 rounded-lg border">
          Total Categories:{" "}
          <span className="font-semibold text-lg ml-3">
            {stats.totalCategories}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h2 className=" mb-2 border-b py-2 text-lg">
            Blog Posts per Category:
          </h2>
          <div className="grid grid-cols-2 gap-2 capitalize">
            {stats.blogPostsPerCategory.map((category) => (
              <p key={category.categoryName}>
                {category.categoryName}: {category.blogPostCount}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 border-b text-lg py-2">Projects per Category:</h2>
          <div className="grid grid-cols-2 gap-2 capitalize">
            {stats.projectsPerCategory.map((category) => (
              <p key={category.categoryName}>
                {category.categoryName}: {category.projectCount}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
