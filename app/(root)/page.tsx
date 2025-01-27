import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import SelectedWorks from "@/components/SelectedWorks";
import Skills from "@/components/Skills";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <div>
      <div className="text-center md:text-start flex flex-col items-center md:items-start">
        <h2 className="text-3xl text-balance mb-4 capitalize">
          Innovating Technology, Empowering Solutions
        </h2>
        <p className="mb-4 text-pretty max-w-[50ch]">
          I am Passionate about solving real-world problems through innovative,
          efficient, and forward-thinking digital solutions.
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
