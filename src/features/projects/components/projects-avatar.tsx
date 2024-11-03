import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  className?: string;
  fallbackClassName?: string;
}

export const ProjectAvatar = ({
  name,
  image,
  className,
  fallbackClassName,
}: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative overflow-hidden rounded-md ", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "bg-blue-600 rounded-md text-white font-semibold text-sm uppercase",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
