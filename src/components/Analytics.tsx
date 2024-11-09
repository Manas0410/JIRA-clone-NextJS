import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea } from "./ui/scroll-area";
import { AnalyticsCard } from "./AnalyticsCard";
import { DottedSeperator } from "./dotted-seperator";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="w-full border rounded-lg whitespace-normal shrink-0">
      <div className="w-full flex flow-row py-2">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Total Tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
          <DottedSeperator direction="vertical" className=" h-full w-max " />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedTaskDifference}
          />
          <DottedSeperator direction="vertical" className=" h-full " />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
          <DottedSeperator direction="vertical" className=" h-full " />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overDueTaskCount}
            variant={data.overDueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overDueTaskDifference}
          />
          <DottedSeperator direction="vertical" className=" h-full " />
        </div>
      </div>
    </ScrollArea>
  );
};
