import React from "react";

import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { getPaginatedProjects } from "@/lib/actions/project";
import { PaginationMenu } from "./Pagination";

export async function BentoGridSecondDemo({
  currentPage,
}: {
  currentPage: number;
}) {
  const { projects, pagination } = await getPaginatedProjects(currentPage);
  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {projects.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.excerpt}
            image={item.image}
            link={`/portfolio/${item.slug}`}
            index={i}
          />
        ))}
      </BentoGrid>
      {pagination.totalPages > 1 && (
        <PaginationMenu
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
