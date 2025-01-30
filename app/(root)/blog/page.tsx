import BlogFetch from "@/components/Blogfetch";
import LoadingUI from "@/components/LoadingUI";
import { Metadata } from "next";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Blog post ",
};

export default async function page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
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
