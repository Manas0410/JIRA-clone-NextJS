import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SigninSchema } from "../schemas";

const auth = new Hono().post(
  "/login",
  zValidator("json", SigninSchema),
  (c) => {
    return c.json({ message: "hello" });
  }
);

export default auth;
