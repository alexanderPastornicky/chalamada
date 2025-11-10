"use client";

import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TaskWithTimeEntries } from "@/lib/tasks/data-access";
import { startTimeEntry, pauseTimeEntry } from "@/lib/tasks/actions";
import { useTransition, useState, useEffect } from "react";

interface TimeTrackingProps {
  task: TaskWithTimeEntries;
}

function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return hours % 24 > 0 ? `${days}d ${hours % 24}h` : `${days}d`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `0m ${seconds}s`;
}

export function TimeTracking({ task }: TimeTrackingProps) {
  const [isPending, startTransition] = useTransition();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  
  const activeTimeEntry = task.timeEntries[0]?.endTime === null ? task.timeEntries[0] : undefined;

  useEffect(() => {
    if (activeTimeEntry) {
      setCurrentTime(new Date());
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTimeEntry]);

  const accumulatedTime = task.timeEntries.reduce((total, entry) => {
    if (entry.endTime) {
      return total + (entry.endTime.getTime() - entry.startTime.getTime());
    } else {
      return currentTime 
        ? total + Math.max(0, currentTime.getTime() - entry.startTime.getTime())  
        : total
    }
  }, 0);

  const handlePlay = () => {
    startTransition(() => {
      startTimeEntry(task.id, null);
    });
  };

  const handlePause = () => {
    startTransition(() => {
      pauseTimeEntry(task.id, null);
    });
  };

  return (
    <div className="flex items-center gap-1 w-fit self-end mt-auto">
      {task.timeEntries.length > 0 && (
      <span className="text-xs text-muted-foreground"> 
        {formatTime(accumulatedTime)}
      </span>
      )}
      {!activeTimeEntry && (
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild >
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlay}
              disabled={isPending}
              aria-label={`Start tracking time for task: ${task.name}`}
            >
              <Play />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
             Start tracking time
          </TooltipContent>
        </Tooltip>
      )}
      {activeTimeEntry && (
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePause}
              disabled={isPending}
              aria-label={`Pause tracking time for task: ${task.name}`}
            >
              <Pause />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Pause tracking time
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
