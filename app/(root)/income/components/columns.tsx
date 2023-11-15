"use client"

import { TransactionColumn } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

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
    accessorKey: "transactionDate",
    header: "Date",
  },
]
