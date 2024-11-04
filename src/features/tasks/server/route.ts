import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTaskSchema } from "../schemas";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, TASKS_ID } from "@/config";
import { ID, Query } from "node-appwrite";

const tasks = new Hono();

// create new task
tasks.post(
  "/",
  sessionMiddleware,
  zValidator("json", createTaskSchema),
  async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { name, status, workspaceId, projectId, dueDate, asigneeId } =
      c.req.valid("json");

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const highestPositionTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("status", status),
        Query.equal("workspaceId", workspaceId),
        Query.orderAsc("$position"),
        Query.limit(1),
      ]
    );

    const newPosition =
      highestPositionTasks.documents.length > 0
        ? highestPositionTasks.documents[0].position + 1000
        : 1000;

    const task = await databases.createDocument(
      DATABASE_ID,
      TASKS_ID,
      ID.unique(),
      {
        name,
        status,
        workspaceId,
        projectId,
        dueDate,
        asigneeId,
        position: newPosition,
      }
    );

    return c.json({ data: task });
  }
);

export default tasks;
