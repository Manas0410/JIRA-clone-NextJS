"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskstModal } from "../hooks/use-create-tasks-modal";
import { useGetTasks } from "../api/use-get-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilter } from "../hooks/use-task-filter";

export const TaskViewSwitcher = () => {
  const [{ projectId, status, dueDate, asigneeId, search }] = useTaskFilter();

  const [View, setView] = useQueryState("taskview", { defaultValue: "table" });

  const workspaceId = useWorkspaceId();

  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
    projectId,
    status,
    dueDate,
    asigneeId,
    search,
  });

  const { open } = useCreateTaskstModal();

  return (
    <Tabs
      defaultValue={View}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg "
    >
      <div className="flex flex-col w-full overflow-auto h-full p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full lg:w-auto h-8" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="w-full lg:w-auto h-8" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-full lg:w-auto h-8" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto " onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeperator className="my-4" />
        <DataFilters />
        <DottedSeperator className="my-4" />
        {isTasksLoading ? (
          <div className="w-full h-[200px] rounded-lg border flex flex-col items-center justify-center">
            <Loader className="animate-spin size-5 text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              Kanban
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              Calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
