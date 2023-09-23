"use client"

import { Heading } from "@/components/ui/heading"
import { TodayIncomeColumn, TransactionColumn, incomeColumns, todayIncomeColumns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

interface IncomeClientProps {
  todayData: TodayIncomeColumn[]
  data: TransactionColumn[]
}

const IncomeClient: React.FC<IncomeClientProps> = ({ todayData, data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Income"
          description="Today's income"
        />
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
