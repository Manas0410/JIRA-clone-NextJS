"use client";

import { Analytics } from "@/components/Analytics";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { useProjectId } from "@/features/projects/hooks/use-projectid";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Client = () => {
  const projectId = useProjectId();

  const { data, isLoading: isLoadingProject } = useGetProject({ projectId });

  const { data: analytics, isLoading: analyticsLoading } =
    useGetProjectAnalytics({ projectId });

  const isLoading = isLoadingProject || analyticsLoading;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message="project not found" />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={data.name}
            image={data.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-bold">{data.name}</p>
        </div>
        <Button variant={"secondary"} asChild size={"sm"}>
          <Link
            href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit Project
          </Link>
        </Button>
      </div>
      {analytics && <Analytics data={analytics} />}
      <TaskViewSwitcher hideProjectFilter={true} />
    </div>
  );
};

export default Client;
