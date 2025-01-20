type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const query = searchParams.query;

  console.log(query);
}

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const query = searchParams.query;
  return <div>{query}</div>;
}
