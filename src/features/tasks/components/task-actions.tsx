import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon } from "lucide-react";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export function TaskActions({ id, projectId, children }: TaskActionsProps) {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
