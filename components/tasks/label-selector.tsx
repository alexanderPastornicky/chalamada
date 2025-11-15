"use client";

import { useState, useTransition } from "react";
import useSWR, { mutate } from "swr";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createLabel } from "@/lib/labels/actions";
import { fetcher } from "@/lib/utils";
import { Label } from "@/prisma/generated/prisma/client";

interface LabelSelectorProps {
  selectedLabelIds: number[];
  onSelectionChange: (labelIds: number[]) => void;
  disabled?: boolean;
}

// Color options with good contrast
const COLOR_OPTIONS = [
  { name: "Grey", value: "#9ca3af" },
  { name: "Dark Grey", value: "#4b5563" },
  { name: "Purple", value: "#a855f7" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Red", value: "#ef4444" },
];

export function LabelSelector({
  selectedLabelIds,
  onSelectionChange,
  disabled = false,
}: LabelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingLabelName, setPendingLabelName] = useState("");

  // Fetch labels using SWR
  const { data: labels = [], error, isLoading } = useSWR<Label[]>("/api/labels", fetcher);

  const filterLower = filter.toLowerCase().trim();

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(filterLower)
  );

  const handleToggle = (labelId: number) => {
    onSelectionChange(
      selectedLabelIds.includes(labelId)
        ? selectedLabelIds.filter((id) => id !== labelId)
        : [...selectedLabelIds, labelId]
    );
  };

  const handleCreateLabel = () => {
    if (isPending) return;
    setPendingLabelName(filterLower);
    setShowColorPicker(true);
  };

  const handleColorSelect = (color: string) => {
    if (isPending) return;

    startTransition(async () => {
      const result = await createLabel(pendingLabelName, color);
      if (result.success && result.labelId) {
        // Revalidate labels cache after creating a new one
        mutate("/api/labels");
        onSelectionChange([...selectedLabelIds, result.labelId]);
        setFilter("");
        setShowColorPicker(false);
        setPendingLabelName("");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFilter("");
      setShowColorPicker(false);
      setPendingLabelName("");
    }
    if (!disabled) setOpen(newOpen);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" disabled={disabled} className="gap-1">
          Labels {labels.length > 0 && <Badge variant="secondary">{`${selectedLabelIds.length}/${labels.length}`}</Badge>}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 max-h-[300px] overflow-y-auto"
      >
        {showColorPicker ? (
          <>
            <div className="p-2 grid grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  onSelect={(e) => e.preventDefault()}
                  disabled={isPending}
                  className="flex flex-col items-center justify-center p-3 h-auto hover:bg-accent cursor-pointer"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                </DropdownMenuItem>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-2 border-b">
              <Input
                type="text"
                placeholder="Add labels..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>

            {filteredLabels.map((label) => (
              <DropdownMenuCheckboxItem
                key={label.id}
                checked={selectedLabelIds.includes(label.id)}
                onCheckedChange={() => handleToggle(label.id)}
                className="flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: label.color }}
                />
                {label.name}
              </DropdownMenuCheckboxItem>
            ))}

            {(filteredLabels.length === 0 && filterLower !== "") && (
              <DropdownMenuItem
                onClick={handleCreateLabel}
                onSelect={(e) => e.preventDefault()}
                disabled={isPending}
                className="flex items-center gap-1 min-w-0"
              >
                <span className="whitespace-nowrap flex-shrink-0">Create label</span>
                <span className="font-bold truncate min-w-0">"{filterLower}"</span>
              </DropdownMenuItem>
            )}

            {(labels.length === 0 && filterLower === "") && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Create your first label
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

