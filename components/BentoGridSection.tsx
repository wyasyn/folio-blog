import React from "react";

import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { getPaginatedProjects } from "@/lib/actions/project";

export async function BentoGridSecondDemo() {
  const projectData = await getPaginatedProjects();

  if (!projectData) {
    return <div>Error no data found</div>;
  }

  if (projectData && projectData.projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {projectData.projects.map((item, i) => (
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
  );
}
