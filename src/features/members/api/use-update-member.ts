import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type responseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type requestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("failed to update member");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member updated");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      toast.error("Failed to update member ");
    },
  });

  return mutation;
};
