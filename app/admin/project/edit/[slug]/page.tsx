import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form, { FormData } from "@/components/Form";

const EditProject: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [project, setProject] = useState<FormData | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/getProject?id=${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch((error) => console.error("Error fetching project:", error));
    }
  }, [id]);

  const editProject = async (data: FormData) => {
    try {
      const response = await fetch(`/api/editProject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id }),
      });

      const result = await response.json();
      alert(result.message || "Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return project ? (
    <Form
      onSubmit={editProject}
      initialData={project}
      buttonText="Edit Project"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default EditProject;
