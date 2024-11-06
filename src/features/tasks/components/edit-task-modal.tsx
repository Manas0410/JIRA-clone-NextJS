"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";
import { useUpdateTaskstModal } from "../hooks/use-update-task-modal";

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskstModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <CreateTaskFormWrapper onCancel={close} />}
    </ResponsiveModal>
  );
};
