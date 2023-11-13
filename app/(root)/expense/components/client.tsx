"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { ExpenseColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface ExpenseClientProps {
  data: ExpenseColumn[]
}

const ExpenseClient = ({ data }: ExpenseClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Expense (${data.length})`}
          description="Manage expense"
        />
        <Button onClick={() => router.push("/expense/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  )
}

export default ExpenseClient
