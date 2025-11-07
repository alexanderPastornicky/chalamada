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
import { TaskItem } from "./task-item";

export async function TaskList() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return (
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
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
