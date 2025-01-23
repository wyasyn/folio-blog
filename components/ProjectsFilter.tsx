"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const projectFilters = ["all", "web", "mobile", "other"];

export default function ProjectsFilter() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="flex items-center gap-3 justify-center">
        {projectFilters.map((filter, index) => {
          const isActive = query === filter || (filter === "all" && !query);
          const href =
            filter === "all" ? "/portfolio" : `/portfolio?query=${filter}`;

          return (
            <Link
              href={href}
              key={index}
              className={`px-3 capitalize py-2 border rounded-lg text-xs ${
                isActive
                  ? "bg-muted-foreground text-background "
                  : "text-muted-foreground"
              }`}
            >
              {filter}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
