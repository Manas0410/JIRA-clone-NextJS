"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeperator } from "@/components/dotted-seperator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });

  return (
    <Card className="w-full h-full border-none shadow-none">
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
            <Fragment>
              <div key={member.$id} className="flex items-center gap-2"></div>
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
