import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DottedSeperator } from "./dotted-seperator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 w-full p-4">
      <Link href="/">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={35} height={35} />{" "}
          <p>CONTROLLER</p>
        </h1>
      </Link>
      <DottedSeperator className="my-4 h-max" />
      <WorkspaceSwitcher />
      <DottedSeperator className="my-4 h-max" />
      <Navigation />
      <DottedSeperator className="my-4 h-max" />
      <Projects />
    </aside>
  );
};
