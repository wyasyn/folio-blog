"use client";

import Form, { FormData } from "@/components/Form";
import { editProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface projectProps {
  title: string;
  excerpt: string | undefined;
  image: string | undefined;
  body: string | undefined;
  categories: string;
}
function EditProjectComponent({
  id,
  project,
}: {
  id: number;
  project: projectProps;
}) {
  const router = useRouter();
  const editProjectFunc = async (data: FormData) => {
    try {
      const { message, error } = await editProject({ ...data, id });
      if (message) {
        toast.success(message);
        router.refresh();
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("An error occurred while updating the project");
    }
  };

  return (
    <Form
      onSubmit={editProjectFunc}
      initialData={project}
      buttonText="Edit Project"
    />
  );
}

export default EditProjectComponent;
