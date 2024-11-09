"use client";

import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { useProjectId } from "@/features/projects/hooks/use-projectid";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Client = () => {
  const projectId = useProjectId();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-bold">{initialValues.name}</p>
        </div>
        <Button variant={"secondary"} asChild size={"sm"}>
          <Link
            href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit Project
          </Link>
        </Button>
      </div>
      <TaskViewSwitcher hideProjectFilter={true} />
    </div>
  );
};

export default Client;
