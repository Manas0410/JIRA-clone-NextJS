import { useState } from "react";
import { Task, TaskStatus } from "../types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";

interface DataKanbanProps {
  data: Task[];
}

type taskSatate = {
  [key in TaskStatus]: Task[];
};

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [Tasks, setTasks] = useState<taskSatate>(() => {
    const initialTasks: taskSatate = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  const handleDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader board={board} count={Tasks[board].length} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
