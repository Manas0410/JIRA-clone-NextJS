import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeperator } from "@/components/dotted-seperator";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TascDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TascDescriptionProps) => {
  const [IsEditting, setIsEditting] = useState(false);
  const [Value, setValue] = useState<string>(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: {
        description: Value,
      },
      param: { taskId: task.$id },
    });
    setIsEditting(false);
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold"> Task Description</p>
        <Button
          onClick={() => setIsEditting((p) => !p)}
          size={"sm"}
          variant={"secondary"}
        >
          {IsEditting ? (
            <>
              <XIcon className="size-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="size-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      <DottedSeperator className="my-4 h-max" />
      {IsEditting ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            disabled={isPending}
          />
          <Button
            size={"sm"}
            disabled={isPending}
            onClick={handleSave}
            className="w-fit ml-auto"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No description </span>
          )}
        </div>
      )}
    </div>
  );
};
