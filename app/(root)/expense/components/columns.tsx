"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ExpenseColumn = {
  id: string
  name: string
  price: number
  transactionDate: string
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
    accessorKey: "transactionDate",
    header: "Date",
  },
]
