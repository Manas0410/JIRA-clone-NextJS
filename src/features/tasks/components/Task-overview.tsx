import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeperator } from "@/components/dotted-seperator";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useUpdateTaskstModal } from "../hooks/use-update-task-modal";

interface TaskOverviewProps {
  task: Task;
}

export function TaskOverview({ task }: TaskOverviewProps) {
  const { open } = useUpdateTaskstModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Task Details</p>
          <Button
            size={"sm"}
            variant="secondary"
            onClick={() => open(task.$id)}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeperator className="my-4 h-max" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
}
