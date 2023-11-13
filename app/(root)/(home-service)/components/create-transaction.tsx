import axios from "axios"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { ServiceColumn } from "./columns"
import { Button } from "@/components/ui/button"

interface CreateTransactionProps {
  data: ServiceColumn
}

const CreateTransaction = ({ data }: CreateTransactionProps) => {
  const onAddTransaction = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await axios.post("/api/transactions", data)
      toast.success("Transaction added.")
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <Button onClick={onAddTransaction}>
      <Plus size={20} />
    </Button>
  )
}

export default CreateTransaction
