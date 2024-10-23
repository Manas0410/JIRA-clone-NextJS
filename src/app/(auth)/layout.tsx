import Image from "next/image";
import { Button } from "../../components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={45} height={45} />
            <h1 className="text-2xl font-bold">SMxCONTROLLER</h1>
          </div>
          <Button variant={"secondary"}>Sign Up</Button>
        </nav>
        <div className="flex justify-center items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
