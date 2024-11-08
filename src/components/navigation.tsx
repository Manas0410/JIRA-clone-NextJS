"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    name: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    name: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {routes.map(({ name, href, icon, activeIcon }) => {
        const fullHref = `/workspaces/${workspaceId}${href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? activeIcon : icon;
        return (
          <li key={href}>
            <Link href={fullHref}>
              <div
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-3 rounded-md font-medium hover:text-primary transition text-neutral-500 cursor-pointer",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <Icon className="size-5 text-neutral-500" />
                <span>{name}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
