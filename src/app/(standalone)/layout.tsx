import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

interface standAloneLayoutProps {
  children: React.ReactNode;
}
export default function StandAloneLayout({ children }: standAloneLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen w-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between h-[73px]">
          <Link href="/">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={35} height={35} />{" "}
              <p>SMxCONTROLLER</p>
            </h1>
          </Link>
          <UserButton />
        </nav>
        <div className="flex justify-center items-center flex-col py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
