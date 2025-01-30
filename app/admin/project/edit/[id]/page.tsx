import AdminTitle from "@/components/AdminTitle";

import EditProjectComponent from "@/components/EditProject";
import { getProjectById } from "@/lib/actions/project";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const getCashedProject = unstable_cache(async (id: string) => {
  const { project } = await getProjectById(parseInt(id));
  if (!project) notFound();
  return project;
});

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const project = await getCashedProject(id);
  return {
    title: "Edit Project - " + project?.title,
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const id = params.id;

  const project = await getCashedProject(id);

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
