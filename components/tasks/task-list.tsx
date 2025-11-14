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

interface TaskListProps {
  labelNames: string[];
}

export async function TaskList({ labelNames }: TaskListProps) {
  const [tasks, labels] = await Promise.all([
    getTasks(labelNames),
    getLabels(),
  ]);

  return (
    <>
      {(labelNames.length > 0 || tasks.length > 0) && labels.length > 0 && (
        <div className="mt-4 flex justify-end">
          <LabelFilter labels={labels} selectedLabelNames={labelNames} />
        </div>
      )}
      {!tasks.length ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListTodo />
            </EmptyMedia>
            <EmptyTitle>No tasks yet</EmptyTitle>
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
