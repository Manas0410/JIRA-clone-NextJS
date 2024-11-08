import { Task } from "../types";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { CalendarIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

import { enUS } from "date-fns/locale";
import { useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";

const locales = {
  "en-US": enUS,
};

const loaclizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        onClick={() => onNavigate("PREV")}
        variant="secondary"
        size={"icon"}
        className="flex items-center justify-center"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h8 justify-center w-full lg:w-auto ">
        <CalendarIcon className="size-4 mr-2" />
        <p className="text-sm">{format(date, "MMMM yyyy")}</p>
      </div>

      <Button
        onClick={() => onNavigate("NEXT")}
        variant="secondary"
        size={"icon"}
        className="flex items-center justify-center"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [Value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    asignee: task.asignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(Value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(Value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={loaclizer}
      date={Value}
      events={events}
      defaultDate={Value}
      defaultView="month"
      views={["month"]}
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => {
          return (
            <EventCard
              id={event.id}
              title={event.title}
              asignee={event.asignee}
              project={event.project}
              status={event.status}
            />
          );
        },
        toolbar: () => {
          return <CustomToolbar date={Value} onNavigate={handleNavigate} />;
        },
      }}
    />
  );
};
