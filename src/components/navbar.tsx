import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="pt-4 px-8 flex w-full items-center justify-between">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitor all of your project and tasks here
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
