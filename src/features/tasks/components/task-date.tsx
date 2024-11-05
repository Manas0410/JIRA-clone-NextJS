import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";

interface TaskDateProps {
  value: string;
  className?: string;
}

export const TaskDate = ({ value, className }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const differenceDays = differenceInDays(endDate, today);

  let defaultTextColor = "text-muted-foreground";

  if (differenceDays <= 3) {
    defaultTextColor = "text-red-500";
  } else if (differenceDays <= 7) {
    defaultTextColor = "text-orange-500";
  } else if (differenceDays <= 14) {
    defaultTextColor = "text-yellow-500";
  }

  return (
    <div className={cn(defaultTextColor)}>
      <span className={cn("truncate", className)}>
        {format(endDate, "PPP")}
      </span>
    </div>
  );
};
