"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { TodayIncomeColumn, TransactionColumn, incomeColumns, todayIncomeColumns } from "./columns"

interface IncomeClientProps {
  todayData: TodayIncomeColumn[]
  data: TransactionColumn[]
}

const IncomeClient = ({ todayData, data }: IncomeClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Income"
          description="Today's income"
        />
        <Button onClick={() => router.push("/income/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <DataTable
        columns={todayIncomeColumns}
        data={todayData}
      />
      <Separator />
      <div className="flex items-center justify-between">
        <Heading
          title=""
          description="Manage income"
        />
      </div>
      <DataTable
        columns={incomeColumns}
        data={data}
      />
    </>
  )
}

export default IncomeClient
