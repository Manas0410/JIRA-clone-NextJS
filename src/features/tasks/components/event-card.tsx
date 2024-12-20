import { Project } from "@/features/projects/types";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Member } from "@/features/members/types";

interface EventCardProps {
  id: string;
  title: string;
  asignee: Member;
  project: Project;
  status: TaskStatus;
}

const statusColorMap = {
  [TaskStatus.DONE]: "border-l-emerald-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.BACKLOG]: "border-l-pink-500",
};

export const EventCard = ({
  id,
  title,
  asignee,
  project,
  status,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  return (
    <div className="mx-2" onClick={handleClick}>
      <div
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition ",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={asignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};
