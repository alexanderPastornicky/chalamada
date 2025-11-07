import { Suspense } from "react";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { TaskList } from "@/components/tasks/task-list";

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full">
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Manage your tasks. Create, view, and delete tasks as needed.
          </p>
        </div>
        <CreateTaskModal />
      </div>
      <Suspense fallback={<div className="mt-8 text-center py-12">Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </>
  );
}

