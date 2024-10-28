import { Loader } from "lucide-react";

const DashBoardLoading = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Loader className="animate-spin size-6 text-muted-foreground" />
    </div>
  );
};

export default DashBoardLoading;
