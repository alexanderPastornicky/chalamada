"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditTaskModal } from "./edit-task-modal";
import { DeleteTaskModal } from "./delete-task-modal";
import { TimeTracking } from "./time-tracking";
import { TaskWithTimeEntries } from "@/lib/tasks/data-access";

interface TaskItemProps {
  task: TaskWithTimeEntries;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function getTaskStatus(task: TaskWithTimeEntries) {
    if (task.timeEntries.length === 0) {
      return "Todo";
    } else {
      return "In Progress";
    }
  }

  return (
    <>
      <div className="flex flex-col border rounded-sm p-2 py-1 bg-card h-26">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{task.name}</span>
            <Badge variant="secondary">
              {getTaskStatus(task)}
            </Badge>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={`More options for task: ${task.name}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1 flex-wrap">
            {task.labels.map((label) => (
              <Badge
                key={label.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: label.color }}
                />
                {label.name}
              </Badge>
            ))}
          </div>
          <TimeTracking task={task} />
        </div>
      </div>

      <EditTaskModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        task={task}
      />

      <DeleteTaskModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        task={task}
      />
    </>
  );
}

