import { ListTodo } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getTasks } from "@/lib/tasks/data-access";
import { getLabels } from "@/lib/labels/data-access";
import { TaskItem } from "./task-item";
import { LabelFilter } from "./label-filter";
import { StatusFilter } from "./status-filter";
import { TaskStatus } from "@/lib/tasks/types";

interface TaskListProps {
  labelNames: string[];
  statuses: TaskStatus[];
}

export async function TaskList({ labelNames, statuses }: TaskListProps) {
  const [tasks, labels] = await Promise.all([
    getTasks(labelNames, statuses),
    getLabels(),
  ]);

  return (
    <>
      <div className="mt-4 flex justify-end gap-2">
        {labels.length > 0 && (
          <LabelFilter labels={labels} selectedLabelNames={labelNames} />
        )}
        <StatusFilter selectedStatuses={statuses} />
      </div>
      {!tasks.length ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListTodo />
            </EmptyMedia>
            <EmptyTitle>No tasks</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="mt-4 space-y-2 max-w-2xl mx-auto w-full">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}
