import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";

export const getProject = async ({ projectId }: { projectId: string }) => {
  try {
    console.log("get current");

    const { dataBases, account } = await createSessionClient();

    const user = await account.get();

    const project = await dataBases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases: dataBases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) return null;

    return project;
  } catch (err) {
    console.log("catch", err);
    return null;
  }
};
