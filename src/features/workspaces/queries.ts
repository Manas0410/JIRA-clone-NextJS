import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
  try {
    console.log("get current");

    const { dataBases, account } = await createSessionClient();

    const user = await account.get();

    const members = await dataBases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) return { documents: [], total: 0 };

    const workspaceIds = members?.documents?.map(
      (member) => member.workspaceId
    );

    const workspaces = await dataBases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return workspaces;
  } catch (err) {
    console.log("catch", err);
    return { documents: [], total: 0 };
  }
};

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    console.log("get current");

    const { dataBases, account } = await createSessionClient();

    const user = await account.get();

    const member = await getMember({
      databases: dataBases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) return null;

    const workspace = await dataBases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return workspace;
  } catch (err) {
    console.log("catch", err);
    return null;
  }
};