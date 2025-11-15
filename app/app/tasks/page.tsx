import { Suspense } from "react";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { TaskList } from "@/components/tasks/task-list";
import { TaskStatus } from "@/lib/tasks/types";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ labels?: string; status?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const labelNames = params.labels?.split(',').filter(Boolean) || [];
  const statuses = (params.status?.split(',').filter(Boolean) || []) as TaskStatus[];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full">
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
          “You can't improve what you don't measure.”
          </p>
        </div>
        <CreateTaskModal />
      </div>
      <Suspense>
        <TaskList labelNames={labelNames} statuses={statuses} />
      </Suspense>
    </>
  );
}

