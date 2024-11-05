import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, Pen, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export function TaskActions({ id, projectId, children }: TaskActionsProps) {
  const { mutate, isPending } = useDeleteTask();

  const [ConfirmDialog, Confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone.",
    "destructive"
  );

  const onDelete = async () => {
    const ok = await Confirm();

    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <ConfirmDialog />
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => {}}
            className="font-medium p-[10px]"
            disabled={false}
          >
            <ExternalLinkIcon className="mr-2 h-4 w-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="font-medium p-[10px]"
            disabled={false}
          >
            <ExternalLinkIcon className="mr-2 h-4 w-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="font-medium p-[10px]"
            disabled={false}
          >
            <PencilIcon className="mr-2 h-4 w-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            disabled={isPending}
          >
            <TrashIcon className="mr-2 h-4 w-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
