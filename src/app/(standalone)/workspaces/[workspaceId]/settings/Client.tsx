"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const Client = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialvalues, isLoading } = useGetProject({
    projectId: projectId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialvalues) {
    return <PageError message="workspace not found" />;
  }
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default Client;
