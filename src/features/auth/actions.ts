import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    console.log("get current");
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE)?.value;

    if (!session) {
      return null;
    }

    client.setSession(session);
    const account = new Account(client);

    return await account.get();
  } catch (err) {
    console.log("catch", err);
    return null;
  }
};
