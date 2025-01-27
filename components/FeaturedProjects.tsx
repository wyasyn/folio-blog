import { Suspense } from "react";
import { BentoGridSecondDemo } from "./BentoGridSection";
import ProjectsFilter from "./ProjectsFilter";
import LoadingUI from "./LoadingUI";

export default function FeaturedProjects({
  currentPage,
}: {
  currentPage: number;
}) {
  return (
    <div>
      <ProjectsFilter />
      <Suspense fallback={<LoadingUI />}>
        <BentoGridSecondDemo currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
