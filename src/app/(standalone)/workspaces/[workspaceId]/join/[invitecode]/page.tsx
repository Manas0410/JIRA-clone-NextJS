import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface JoinWorkspaceWithCodePageProps {
  params: {
    workspaceId: string;
    invitecode: string;
  };
}

const JoinWorkspaceWithCodePage = async ({
  params,
}: JoinWorkspaceWithCodePageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const Workspace = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!Workspace) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={Workspace} />
    </div>
  );
};

export default JoinWorkspaceWithCodePage;
