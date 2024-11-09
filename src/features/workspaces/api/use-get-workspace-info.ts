import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspaceInfo = ({ workspaceId }: useGetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].info["$get"](
        {
          param: {
            workspaceId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("failed to get workspace information");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
