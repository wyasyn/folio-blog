import { Suspense } from "react";
import { BentoGridSecondDemo } from "./BentoGridSection";

import LoadingUI from "./LoadingUI";

export default function FeaturedProjects({
  currentPage,
}: {
  currentPage: number;
}) {
  return (
    <div className="mt-8">
      <Suspense fallback={<LoadingUI />}>
        <BentoGridSecondDemo basePath="/portfolio" currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
