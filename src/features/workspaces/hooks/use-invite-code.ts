import { useParams } from "next/navigation";

export function useInviteCode() {
  const params = useParams();
  return params.invitecode as string;
}
