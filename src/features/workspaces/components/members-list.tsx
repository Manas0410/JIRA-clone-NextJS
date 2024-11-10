"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeperator } from "@/components/dotted-seperator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();
  const [ConfirmDialog, Confirm] = useConfirm(
    "Delete Member",
    "This member will be removed from the workspace",
    "destructive"
  );

  const handleDeleteMember = async (memberId: string) => {
    const ok = await Confirm();

    if (!ok) return;

    deleteMember(
      {
        param: {
          memberId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Member deleted");
          window.location.reload();
        },
      }
    );
  };

  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      param: {
        memberId,
      },
      json: {
        role,
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="p-7 flex flex-row items-center gap-x-4 space-y-0">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <div className="grid grid-cols-1 gap-4">
          {data?.documents.map((member, index) => (
            <Fragment key={member.$id}>
              <div key={member.$id} className="flex items-center gap-2">
                <MemberAvatar
                  className="size-10"
                  fallbackClassname="text-lg"
                  name={member.name}
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="ml-auto"
                      variant={"secondary"}
                      size="icon"
                    >
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" side="bottom">
                    <DropdownMenuItem
                      className="font-medium "
                      onClick={() => {
                        handleUpdateMember(member.$id, MemberRole.ADMIN);
                      }}
                      disabled={isUpdating || isDeleting}
                    >
                      Set as administrator
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium "
                      onClick={() => {
                        handleUpdateMember(member.$id, MemberRole.MEMBER);
                      }}
                      disabled={isUpdating || isDeleting}
                    >
                      Set as member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => {
                        handleDeleteMember(member.$id);
                      }}
                      disabled={isUpdating || isDeleting}
                    >
                      Remove {member.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {index < data?.documents.length - 1 && (
                <Separator className="my-2.5" />
              )}
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
