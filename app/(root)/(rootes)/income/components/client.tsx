"use client"

import { Heading } from "@/components/ui/heading"
import { TransactionColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface IncomeClientProps {
  data: TransactionColumn[]
}

const IncomeClient: React.FC<IncomeClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Income (${data.length})`}
          description="Manage income"
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  )
}

export default IncomeClient
