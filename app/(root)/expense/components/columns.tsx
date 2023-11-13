"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ExpenseColumn = {
  id: string
  name: string
  price: number
  createdAt: string
}

export const columns: ColumnDef<ExpenseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
