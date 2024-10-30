import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const JoinWorkspaceWithCodePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div>Join Workspace With Code Page</div>;
};

export default JoinWorkspaceWithCodePage;
