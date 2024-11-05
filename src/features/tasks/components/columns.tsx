"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../types";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
  },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },
  //   {
  //     accessorKey: "project",
  //     header: "Project",
  //   },
  //   {
  //     accessorKey: "assignee",
  //     header: "Assignee",
  //   },
  //   {
  //     accessorKey: "dueDate",
  //     header: "Due Date",
  //   },
];
