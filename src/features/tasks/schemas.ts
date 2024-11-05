import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  status: z.nativeEnum(TaskStatus, { required_error: "Rrequired" }),
  workspaceId: z.string().trim().min(1, { message: "Required" }),
  projectId: z.string().trim().min(1, { message: "Required" }),
  dueDate: z.coerce.date().optional(),
  asigneeId: z.string().trim().min(1, { message: "Required" }),
  description: z.string().optional(),
  position: z.number().optional(),
});
