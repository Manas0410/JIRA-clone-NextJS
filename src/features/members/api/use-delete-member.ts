import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type responseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type requestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("failed to delete member");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member deleted");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      toast.error("Failed to delete member ");
    },
  });

  return mutation;
};
