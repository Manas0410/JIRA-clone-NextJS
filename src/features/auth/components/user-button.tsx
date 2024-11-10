"use client";

import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DottedSeperator } from "@/components/dotted-seperator";

import { useLogOut } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogOut();

  if (isLoading) {
    <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300 ">
      <Loader className="animate-spin size-4 text-muted-foreground" />
    </div>;
  }

  if (!user) {
    return null;
  }

  const { name, email } = user || {};
  const avatarFallBack = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center ">
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        side="bottom"
        sideOffset={10}
      >
        <div className="flex flex-col gap-2 items-center justify-center px-2.5 py-4 ">
          <Avatar className="size-[52px] transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center ">
              {avatarFallBack}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col  items-center justify-center">
            <p className="text-sm text-neutral-900 fomt-medium">
              {name || "user"}
            </p>
            <p className="text-sm text-neutral-500">{email}</p>
          </div>
          <DottedSeperator className="mb-1" />
          <DropdownMenuItem
            onClick={() => logout()}
            className="flex  text-amber-700 font-medium cursor-pointer items-center justify-center"
          >
            <LogOut className="size-4 mr-2 " />
            Log Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
