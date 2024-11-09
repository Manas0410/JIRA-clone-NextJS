import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetProjectsProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: useGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["$get"]({
        param: {
          projectId,
        },
      });

      if (!response.ok) {
        throw new Error("failed to get project");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};