"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
export const MobileSidebar = () => {
  const pathname = usePathname();
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={IsOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"} className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
