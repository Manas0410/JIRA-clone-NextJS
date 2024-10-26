import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type responseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type requestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useSignup = () => {
  const mutation = useMutation<responseType, Error, requestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"](json);
      return await response.json();
    },
  });

  return mutation;
};
