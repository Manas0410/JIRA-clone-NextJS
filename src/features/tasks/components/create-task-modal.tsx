import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateTaskstModal } from "../hooks/use-create-tasks-modal";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskstModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      {/* <CreateTaskForm onCancel={close} /> */}
      <></>
    </ResponsiveModal>
  );
};
