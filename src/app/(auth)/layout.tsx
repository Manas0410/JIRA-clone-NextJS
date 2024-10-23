"use client";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const path = usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={45} height={45} />
            <h1 className="text-2xl font-bold">SMxCONTROLLER</h1>
          </div>
          <Button asChild variant={"secondary"}>
            <Link href={path === "/sign-in" ? "/sign-up" : "/sign-in"}>
              {path === "/sign-in" ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex justify-center items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
