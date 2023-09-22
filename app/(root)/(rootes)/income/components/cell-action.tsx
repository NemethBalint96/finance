"use client"

import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import axios from "axios"
import { TransactionColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
  data: TransactionColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/transactions/${data.id}`)
      router.refresh()
      toast.success("Transaction deleted.")
    } catch (error) {
      toast.error("Something bad happened.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={20} />
      </Button>
    </>
  )
}
