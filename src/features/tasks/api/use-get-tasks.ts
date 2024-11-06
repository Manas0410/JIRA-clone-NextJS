import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";

interface useGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  dueDate?: string | null;
  asigneeId?: string | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  dueDate,
  asigneeId,
  search,
}: useGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      dueDate,
      asigneeId,
      search,
    ],
    queryFn: async () => {
      const response = await client.api.tasks["$get"]({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          dueDate: dueDate ?? undefined,
          asigneeId: asigneeId ?? undefined,
          search: search ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("failed to get tasks");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
