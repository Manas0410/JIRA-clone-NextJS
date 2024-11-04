"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { useCreateTaskstModal } from "../hooks/use-create-tasks-modal";

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskstModal();
  return (
    <Tabs className="flex-1 w-full border rounded-lg">
      <div className="flex flex-col overflow-auto h-full p-4">
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
        Data filyters
        <DottedSeperator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Table
          </TabsContent>

          <TabsContent value="kanban" className="mt-0">
            Kanban
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            Calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
