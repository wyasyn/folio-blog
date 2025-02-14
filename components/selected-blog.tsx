import Link from "next/link";
import React, { Suspense } from "react";
import LoadingUI from "./LoadingUI";
import BlogFetch from "./Blogfetch";

export default function SelectedBlog({ currentPage }: { currentPage: number }) {
  const pageSize = 4;
  return (
    <div className=" pt-[4rem] mb-[3rem]">
      <div className="flex items-center mb-[2rem] justify-between ">
        <h2 className="text-2xl ">My Insights</h2>
        <Link
          href={`/blog`}
          className="px-4 py-2 border rounded-lg hover:bg-muted-foreground hover:text-background duration-300 transition-all text-xs"
        >
          See More
        </Link>
      </div>
      <Suspense fallback={<LoadingUI />}>
        <BlogFetch currentPage={currentPage} pageSize={pageSize} />
      </Suspense>
    </div>
  );
}
