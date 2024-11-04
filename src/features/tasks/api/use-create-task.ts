import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type responseType = InferResponseType<(typeof client.api.tasks)["$post"], 200>;
type requestType = InferRequestType<(typeof client.api.tasks)["$post"]>;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["$post"]({ json });
      if (!response.ok) {
        throw new Error("failed to create project");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  return mutation;
};
