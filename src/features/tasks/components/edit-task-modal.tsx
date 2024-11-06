"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdateTaskstModal } from "../hooks/use-update-task-modal";
import { UpdateTaskFormWrapper } from "./update-task-form-wrapper";

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskstModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
