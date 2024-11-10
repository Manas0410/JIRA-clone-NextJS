"use client";

import { Analytics } from "@/components/Analytics";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskstModal } from "@/features/tasks/hooks/use-create-tasks-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { PlusIcon } from "lucide-react";

const Client = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: analyticsLoading } =
    useGetWorkspaceAnalytics({
      workspaceId,
    });
  const { data: tasks, isLoading: tasksLoading } = useGetTasks({ workspaceId });
  const { data: projects, isLoading: projectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  const { open: createProject } = useCreateProjectModal();

  const isLoading =
    analyticsLoading || tasksLoading || projectsLoading || membersLoading;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="workspace not found" />;
  }
  return (
    <div className="flex h-full flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
      </div>
    </div>
  );
};

export default Client;

interface tasklistProps {
  data: Task[];
  total: number;
}

export const TaskList = ({ data, total }: tasklistProps) => {
  const { open: createTask } = useCreateTaskstModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button
            variant={"muted"}
            size={"icon"}
            onClick={createTask}
            className="text-sm text-primary hover:underline"
          >
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
      </div>
      {data.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
