"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  const pathName = usePathname();
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between mb-4">
        <p className="text-neutral-500 uppercase text-xs">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="text-neutral-500 cursor-pointer size-5 hover:opacity-75 transition-all"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}?projectId=${project.$id}`;
        const isActive = pathName === href;
        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",

                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar name={project.name} image={project.imageUrl} />
              <p className="truncate">{project.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
