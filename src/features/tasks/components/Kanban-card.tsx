import { MoreHorizontalIcon } from "lucide-react";
import { Task } from "../types";
import { TaskActions } from "./task-actions";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white rounded p-2.5 mb-1.5 shadow-sm space-y-3">
      <div className="flex items-start gap-x-2 justify-between">
        <p className="text-sm line-clamp-2"> {task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 bg-neutral-100 p1.5 hover:opacity-75 transition" />
        </TaskActions>
      </div>
    </div>
  );
};
