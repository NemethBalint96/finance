"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-action"
import CreateTransaction from "./create-transaction"
import { Button } from "@/components/ui/button"
import ColorCell from "@/components/color-cell"

export type ServiceColumn = {
  id: string
  name: string
  price: number
  color?: string | null
  categoryId?: string
}

export const columns: ColumnDef<ServiceColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
  {
    id: "transaction",
    cell: ({ row }) => <CreateTransaction data={row.original} />,
  },
]
