"use client"

import { TransactionColumn } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<TransactionColumn>[] = [
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
