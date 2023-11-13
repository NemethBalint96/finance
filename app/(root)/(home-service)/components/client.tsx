"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ServiceColumn, columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { DataTable } from "@/components/ui/data-table"

interface SizesClientProps {
  data: ServiceColumn[]
}

const ServicesClient = ({ data }: SizesClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Services (${data.length})`}
          description="Manage services"
        />
        <Button onClick={() => router.push("/new")}>
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

export default ServicesClient
