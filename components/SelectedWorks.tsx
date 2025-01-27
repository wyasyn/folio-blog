import Link from "next/link";
import { BentoGridSecondDemo } from "./BentoGridSection";
import { Suspense } from "react";
import LoadingUI from "./LoadingUI";

export default function SelectedWorks({
  currentPage,
}: {
  currentPage: number;
}) {
  return (
    <div className="mt-[5rem] mb-[3rem]">
      <div className="flex items-center mb-[2rem] justify-between ">
        <h2 className="text-2xl ">Selected Works</h2>
        <Link
          href={`/portfolio`}
          className="px-4 py-2 border rounded-lg hover:bg-muted-foreground hover:text-background duration-300 transition-all text-xs"
        >
          See More
        </Link>
      </div>
      <Suspense fallback={<LoadingUI />}>
        <BentoGridSecondDemo currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
