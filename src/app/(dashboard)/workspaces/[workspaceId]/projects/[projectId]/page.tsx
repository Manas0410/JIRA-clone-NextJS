import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { getProject } from "@/features/projects/queries";
import { Link, PencilIcon } from "lucide-react";
import { redirect } from "next/navigation";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  if (!initialValues) {
    throw new Error("Project not found");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.avatarUrl}
            className="size-8"
          />
          <p className="text-lg font-bold">{initialValues.name}</p>
        </div>
        <Button variant={"secondary"} asChild size={"sm"}>
          <Link
            href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit Project
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default ProjectIdPage;