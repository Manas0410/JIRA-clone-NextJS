import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetMembers } from "@/features/members/api/use-get-members";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectSeparator,
} from "@/components/ui/select";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilter } from "../hooks/use-task-filter";
import { DatePicker } from "@/components/date-picker";
import { set } from "date-fns";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading = isProjectsLoading || isMembersLoading;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptioins = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ projectId, status, dueDate, asigneeId, search }, setFilters] =
    useTaskFilter();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ asigneeId: value === "all" ? null : (value as string) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  const onSearchChange = (value: string) => {
    setFilters({ search: value === "all" ? null : (value as string) });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto  h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={asigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto  h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          <SelectSeparator />
          {memberOptioins?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full lg:w-auto  h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        // disabled={isLoading} need tp put switcher loafding
        placeholder="Due Date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};
