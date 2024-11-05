import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TaskStatus } from "../types";

export const useTaskFilter = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    dueDate: parseAsString,
    asigneeId: parseAsString,
    search: parseAsString,
  });
};
