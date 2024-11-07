import { MoreHorizontalIcon } from "lucide-react";
import { Task } from "../types";
import { TaskActions } from "./task-actions";
import { DottedSeperator } from "@/components/dotted-seperator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";

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
      <DottedSeperator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.asignee.name}
          fallbackClassname="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};