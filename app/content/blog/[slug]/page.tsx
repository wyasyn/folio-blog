type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  console.log(slug);
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
