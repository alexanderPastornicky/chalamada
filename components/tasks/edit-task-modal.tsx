"use client";

import { updateTask } from "@/lib/tasks/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useActionState, useEffect } from "react";
import { Task } from "@/prisma/generated/prisma/client";

interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export function EditTaskModal({
  open,
  onOpenChange,
  task,
}: EditTaskModalProps) {
  const updateTaskWithId = updateTask.bind(null, task.id);
  const [state, formAction, isPending] = useActionState(updateTaskWithId, null);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Task name"
                defaultValue={task.name}
                required
                disabled={isPending}
                className="w-full"
                aria-invalid={!!state?.error}
                aria-describedby={state?.error ? "task-error" : undefined}
                autoComplete="off"
              />
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Task description (optional)"
                defaultValue={task.description || ""}
                disabled={isPending}
                className="w-full min-h-[100px]"
                rows={4}
                autoComplete="off"
              />
            </div>
            {state?.error && (
              <p id="task-error" className="mt-2 text-sm text-destructive" role="alert">
                {state.error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Update Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

