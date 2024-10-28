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

export const WorkspaceSwitcher = () => {
  const { data } = useGetWorkspaces();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-neutral-500 uppercase text-xs">Workspaces</p>
        <RiAddCircleFill className="text-neutral-500 cursor-pointer size-5 hover:opacity-75 transition-all" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No Workspace Selected" />
        </SelectTrigger>
        <SelectContent>
          {data?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
