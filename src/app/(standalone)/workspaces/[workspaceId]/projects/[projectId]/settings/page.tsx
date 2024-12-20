import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import Client from "./Client";

const ProjectSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <Client />;
};

export default ProjectSettingsPage;
