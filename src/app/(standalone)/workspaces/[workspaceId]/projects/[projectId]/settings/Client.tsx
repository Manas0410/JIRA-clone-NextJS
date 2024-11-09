"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { useProjectId } from "@/features/projects/hooks/use-projectid";
import React from "react";

const Client = () => {
  const projectId = useProjectId();
  const { data: initialvalues, isLoading } = useGetProject({
    projectId: projectId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialvalues) {
    return <PageError message="project not found" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialvalues!} />
    </div>
  );
};

export default Client;
