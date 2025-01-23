import { sampleWorks } from "@/lib/sampleWorks";
import PortfolioCard from "./PortfolioCard";

import ProjectsFilter from "./ProjectsFilter";

export default function FeaturedProjects() {
  return (
    <div>
      <ProjectsFilter />
      <div className=" my-[2rem] grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleWorks.map((project, index) => (
          <PortfolioCard
            key={index}
            title={project.title}
            image={project.image.src}
          />
        ))}
      </div>
    </div>
  );
}
