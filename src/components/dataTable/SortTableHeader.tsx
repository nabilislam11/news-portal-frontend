import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Column } from "@tanstack/react-table";

export function createSortableHeader<TData, TValue = unknown>(
  title: string
) {
  const SortableHeader = ({
    column,
  }: {
    column: Column<TData, TValue>;
  }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 text-xs font-medium hover:bg-transparent"
      >
        {title}
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    );
  };

  SortableHeader.displayName = "SortableHeader";
  return SortableHeader;
}
