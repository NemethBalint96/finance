"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { DataTable } from "@/components/ui/data-table"

interface CategoyClientProps {
  data: CategoryColumn[]
}

const CategoryClient = ({ data }: CategoyClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data.length})`}
          description="Manage categories"
        />
        <Button onClick={() => router.push("/category/new")}>
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

export default CategoryClient
