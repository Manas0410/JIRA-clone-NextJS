import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./create-tasks-form";
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface updateTasksFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const UpdateTaskFormWrapper = ({
  onCancel,
  id,
}: updateTasksFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isTaskLoading } = useGetTask({
    taskId: id,
  });

  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptioins = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isProjectsLoading || isMembersLoading || isTaskLoading;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="animate-spin size-5 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptioins ?? []}
      initialValues={initialValues}
    />
  );
};
