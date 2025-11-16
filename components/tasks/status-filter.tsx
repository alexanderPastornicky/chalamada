"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { TaskStatus } from "@/lib/tasks/types";

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

interface StatusFilterProps {
  selectedStatuses: TaskStatus[];
}

export function StatusFilter({ selectedStatuses }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (newStatuses: TaskStatus[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatuses.length) {
      params.set("status", newStatuses.join(","));
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleToggleStatus = (status: TaskStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateUrl(newStatuses);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="gap-1 bg-card">
          Status{" "}
          {selectedStatuses.length > 0 && (
            <Badge variant="secondary">
              {`${selectedStatuses.length}/${STATUS_OPTIONS.length}`}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {STATUS_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedStatuses.includes(option.value)}
            onCheckedChange={() => handleToggleStatus(option.value)}
            onSelect={(e) => e.preventDefault()}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


