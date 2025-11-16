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
import { Label } from "@/prisma/generated/prisma/client";
import { Badge } from "../ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface LabelFilterProps {
  labels: Label[];
  selectedLabelNames: string[];
}

export function LabelFilter({ labels, selectedLabelNames }: LabelFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const updateUrl = (newNames: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
      if (newNames.length) {
        params.set("labels", newNames.join(","));
      } else {
        params.delete("labels");
      }
      router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleToggleLabel = (labelName: string) => {
    const newNames = selectedLabelNames.includes(labelName)
      ? selectedLabelNames.filter((name) => name !== labelName)
      : [...selectedLabelNames, labelName];
    updateUrl(newNames);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="gap-1 bg-card">
          {(selectedLabelNames.length === 0 || isMobile) && "Labels "}
          {selectedLabelNames.length > 0 && (
            <>
              {isMobile ? (
                <Badge variant="secondary">
                  {`${selectedLabelNames.length}/${labels.length}`}
                </Badge>
              ) : (
                selectedLabelNames.map((labelName) => {
                  const label = labels.find((l) => l.name === labelName);
                  return label ? (
                    <Badge key={label.id} variant="secondary" className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />
                      {label.name}
                    </Badge>
                  ) : null;
                })
              )}
            </>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto">
        {labels.length === 0 ? (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            No labels available
          </div>
        ) : (
          labels.map((label) => (
            <DropdownMenuCheckboxItem
              key={label.id}
              checked={selectedLabelNames.includes(label.name)}
              onCheckedChange={() => handleToggleLabel(label.name)}
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: label.color }}
              />
              {label.name}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

