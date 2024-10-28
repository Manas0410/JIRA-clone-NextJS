"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "../api/use-get-workspaces";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "./workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "../hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
  const { data } = useGetWorkspaces();
  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-neutral-500 uppercase text-xs">Workspaces</p>
        <RiAddCircleFill className="text-neutral-500 cursor-pointer size-5 hover:opacity-75 transition-all" />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No Workspace Selected" />
        </SelectTrigger>
        <SelectContent>
          {/* @ts-ignore */}
          {data?.documents?.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};