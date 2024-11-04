"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateTaskstModal } from "../hooks/use-create-tasks-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskstModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      {/* <CreateTaskForm onCancel={close} /> */}
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
