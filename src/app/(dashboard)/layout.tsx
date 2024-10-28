import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <section className="min-h-screen relative">
      <CreateWorkspaceModal />
      <div className="w-full h-full flex">
        <div className="fixed left-0 bg-red-300 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] h-full w-full ">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </section>
  );
}
