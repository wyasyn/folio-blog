import BackBtn from "@/components/BackBtn";
import { MDXRemote } from "next-mdx-remote/rsc";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  return {
    title: slug,
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  return (
    <div>
      <div className="flex w-full items-center justify-end">
        <BackBtn />
      </div>

      <div>
        <MDXRemote source={slug} />
      </div>
    </div>
  );
}
