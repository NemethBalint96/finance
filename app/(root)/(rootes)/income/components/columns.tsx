"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type TodayIncomeColumn = {
  name: String
  count: Number
  sum: Number
}

export const todayIncomeColumns: ColumnDef<TodayIncomeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "sum",
    header: "Total",
  },
]

export type TransactionColumn = {
  id: string
  name: string
  price: number
  createdAt: string
}

export const incomeColumns: ColumnDef<TransactionColumn>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
