import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const PageError = ({
  message = "Something went wrong",
}: {
  message?: string;
}) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground mb-2 " />
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
      <Button variant={"secondary"} asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
};
