import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SigninSchema, SignupSchema } from "../schemas";

const auth = new Hono()
  .post("/login", zValidator("json", SigninSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    console.log({ email, password });
    return c.json({ email, password });
  })
  .post("/register", zValidator("json", SignupSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    console.log({ name, email, password });
    return c.json({ name, email, password });
  });

export default auth;
