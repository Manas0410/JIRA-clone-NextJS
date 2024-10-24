import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SigninSchema, SignupSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie, deleteCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";

const auth = new Hono()
  // sign - in
  .post("/login", zValidator("json", SigninSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    return c.json({ success: true });
  })

  // sign-up
  .post("/register", zValidator("json", SignupSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    return c.json({ success: true });
  })

  // logout
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);
    return c.json({ success: true });
  });

export default auth;
