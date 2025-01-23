"use client";
import Form, { FormData } from "@/components/Form";
import React from "react";

const CreateProject: React.FC = () => {
  const createProject = async (data: FormData) => {
    try {
      const response = await fetch("/api/createProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || "Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return <Form onSubmit={createProject} buttonText="Create Project" />;
};

export default CreateProject;
