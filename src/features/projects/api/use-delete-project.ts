import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type responseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type requestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("failed to delete project");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", data.$id],
      });
    },
    onError: () => {
      toast.error("Failed to dlete project");
    },
  });

  return mutation;
};
