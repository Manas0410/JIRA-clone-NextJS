import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
  name: string;
  image?: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  name,
  image,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn(
          "size-10 relative overflow-hidden rounded-md ",
          className
        )}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback className="bg-blue-600 text-white font-semibold text-lg uppercase">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
