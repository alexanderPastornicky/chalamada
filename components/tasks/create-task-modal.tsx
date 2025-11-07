"use client";

import { createTask } from "@/lib/tasks/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useActionState, useEffect, useState } from "react";

export function CreateTaskModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTask, null);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Create Task</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Task name"
                required
                disabled={isPending}
                className="w-full"
                aria-invalid={!!state?.error}
                aria-describedby={state?.error ? "task-error" : undefined}
              />
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Task description (optional)"
                disabled={isPending}
                className="w-full min-h-[100px]"
                rows={4}
              />
            </div>
            {state?.error && (
              <p id="task-error" className="mt-2 text-sm text-destructive" role="alert">
                {state.error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

