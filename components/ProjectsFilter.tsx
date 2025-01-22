import Link from "next/link";

const projectFilters = ["all", "web", "mobile", "other"];

export default function ProjectsFilter() {
  return (
    <div className="mt-[2rem] flex items-center justify-center">
      <div className="flex items-center gap-3 justify-center">
        {projectFilters.map((filter, index) => {
          const link =
            filter === "all" ? "/portfolio" : `/portfolio/?query=${filter}`;

          return (
            <Link href={link} key={index}>
              <button
                className={`px-3 capitalize py-2 border rounded-lg text-xs`}
              >
                {filter}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
