import NotFound from "@/app/not-found";
import AdminTitle from "@/components/AdminTitle";
import BackBtn from "@/components/BackBtn";
import EditProjectComponent from "@/components/EditProject";
import { getProjectById } from "@/lib/actions/project";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const project = await getProjectById(parseInt(id));

  if (!project) NotFound();
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const { project, error } = await getProjectById(parseInt(id));

  if (error)
    return (
      <div className="mx-auto max-w-sm border-2 border-destructive/50 p-5 rounded-xl bg-destructive/15">
        <div className="flex items-center justify-end">
          <BackBtn />
        </div>
        <p className="mt-5">Error: {error}</p>
      </div>
    );

  if (!project) {
    return;
  }

  const initialData = {
    title: project.title,
    excerpt: project?.excerpt,
    image: project?.image,
    body: project?.body,
    categories: project?.categories.map((category) => category.name).join(", "),
  };

  return (
    <div>
      <AdminTitle title="Edit Project" />
      <div>
        <EditProjectComponent id={parseInt(id)} project={initialData} />
      </div>
    </div>
  );
}
