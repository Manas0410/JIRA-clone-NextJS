import React from "react";
import { cn } from "@/lib/utils";

interface DottedSeperatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeperator = ({
  className,
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: DottedSeperatorProps) => {
  const isHorizontal = direction === "horizontal";

  // Convert dotSize and gapSize to numbers
  const dotSizeNumber = parseInt(dotSize);
  const gapSizeNumber = parseInt(gapSize);

  return (
    <div
      className={cn(
        isHorizontal ? "h-full flex items-center" : "w-full flex items-center",
        className
      )}
    >
      <div
        className={cn(isHorizontal ? "flex-grow" : "flex-grow-0")}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${dotSizeNumber + gapSizeNumber}px ${height}`
            : `${height} ${dotSizeNumber + gapSizeNumber}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
