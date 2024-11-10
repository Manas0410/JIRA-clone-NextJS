"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";
import { title } from "process";

const pathNameMap = {
  tasks: {
    title: "My Tasks",
    description: "Monitor all of your tasks here",
  },
  projects: {
    title: "My Projects",
    description: "Monitor tasks of your projects here",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your project and tasks here",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathNameKey = pathnameParts[3] as keyof typeof pathNameMap;

  const { title, description } = pathNameMap[pathNameKey] || defaultMap;
  return (
    <nav className="pt-4 px-8 flex w-full items-center justify-between">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
