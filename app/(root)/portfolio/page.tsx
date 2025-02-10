import FeaturedProjects from "@/components/FeaturedProjects";
import { Metadata } from "next";

type SearchParams = Promise<{ page: string }>;

export const metadata: Metadata = {
  title: "Portfolio ",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
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
