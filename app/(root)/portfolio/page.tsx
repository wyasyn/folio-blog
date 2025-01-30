import FeaturedProjects from "@/components/FeaturedProjects";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Portfolio ",
};

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = parseInt(page ?? "1") || 1;

  return (
    <div id="portfolio">
      <small className="uppercase text-primary">
        Delivering Impactful Solutions
      </small>
      <h2 className="capitalize text-4xl my-4">Featured Projects</h2>
      <p className="max-w-[35ch]">
        Explore how I bring ideas to life, transforming concepts into seamless,
        engaging digital experiences that drive results.
      </p>

      <FeaturedProjects currentPage={currentPage} />
    </div>
  );
}
