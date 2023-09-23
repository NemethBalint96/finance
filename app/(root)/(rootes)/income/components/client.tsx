"use client"

import { Heading } from "@/components/ui/heading"
import { TodayIncomeColumn, TransactionColumn, incomeColumns, todayIncomeColumns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface IncomeClientProps {
  todayData: TodayIncomeColumn[]
  data: TransactionColumn[]
}

const IncomeClient: React.FC<IncomeClientProps> = ({ todayData, data }) => {
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
