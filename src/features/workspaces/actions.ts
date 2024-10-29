import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE } from "../auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkspaces = async () => {
  try {
    console.log("get current");
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE)?.value;

    if (!session) return { documents: [], total: 0 };

    client.setSession(session);
    const dataBases = new Databases(client);
    const account = new Account(client);
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
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE)?.value;

    if (!session) return null;

    client.setSession(session);
    const dataBases = new Databases(client);
    const account = new Account(client);
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
