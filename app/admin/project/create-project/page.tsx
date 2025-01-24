"use client";
import AdminTitle from "@/components/AdminTitle";
import Form, { FormData } from "@/components/Form";
import { createProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CreateProject: React.FC = () => {
  const router = useRouter();
  const createProjectFunc = async (data: FormData) => {
    try {
      const { message, error } = await createProject(data);

      if (message) {
        toast.success(message);
        router.refresh();
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("An error occurred while creating the project");
    }
  };

  return (
    <>
      <AdminTitle title="Add Project" />
      <Form onSubmit={createProjectFunc} buttonText="Create Project" />
    </>
  );
};

export default CreateProject;
