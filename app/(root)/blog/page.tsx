import BlogFetch from "@/components/Blogfetch";
import LoadingUI from "@/components/LoadingUI";
import { Metadata } from "next";
import { Suspense } from "react";

type SearchParams = Promise<{ page: string }>;

export const metadata: Metadata = {
  title: "Blog post ",
};

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;
  const pageSize = 4;
  return (
    <div id="blog">
      <small className="uppercase text-primary">Blog</small>
      <h2 className="capitalize text-4xl my-4">Insights & Ideas</h2>
      <p className="max-w-[35ch]">
        Explore my latest thoughts, industry trends, and personal musings on
        technology, design, and innovation.
      </p>

      <div className="my-[3rem]">
        <Suspense fallback={<LoadingUI />}>
          <BlogFetch currentPage={currentPage} pageSize={pageSize} />
        </Suspense>
      </div>
    </div>
  );
}
