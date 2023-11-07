"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import ColorCell from "@/components/color-cell"

export type CategoryColumn = {
  id: string
  name: string
  color?: string | null
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "color",
    header: "Color",
    cell: ({ row }) => <ColorCell data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
