import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import SelectedWorks from "@/components/SelectedWorks";
import Skills from "@/components/Skills";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <div>
      <div className="text-center md:text-start flex flex-col items-center md:items-start">
        <h2 className="text-3xl text-balance mb-4 capitalize">
          👋 Welcome to My Digital Space 👉 Crafting Innovative Solutions.
        </h2>
        <p className="mb-6 text-pretty max-w-prose">
          Passionate about solving real-world problems through web development,
          AI, and machine learning. Creating innovative and efficient digital
          solutions that make an impact.{" "}
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-400 duration-300 transition-all"
          >
            Learn more about me →
          </Link>
        </p>
        <div className="flex flex-col min-[341px]:flex-row items-center gap-4 justify-center md:justify-start">
          <SecondaryBtn text="Explore my work" link="/portfolio" />
          <PrimaryBtn text="Let's connect" link="/contact" />
        </div>
      </div>

      <SelectedWorks currentPage={currentPage} />

      <Skills />
    </div>
  );
}
