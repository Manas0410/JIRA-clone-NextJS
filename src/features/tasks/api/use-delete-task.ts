import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type responseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$delete"],
  200
>;
type requestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$delete"]
>;

export const useDeleteTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":taskId"]["$delete"]({ param });
      if (!response.ok) {
        throw new Error("failed to delete task");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task deleted");
      router.refresh();

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task", data.$id],
      });
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
