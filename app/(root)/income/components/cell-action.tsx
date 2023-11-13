"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { TransactionColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
  data: TransactionColumn
}

const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

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

export default CellAction
