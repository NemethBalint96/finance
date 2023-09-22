import { Button } from "@/components/ui/button"
import { ServiceColumn } from "./columns"
import { Plus } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface CreateTransactionProps {
  data: ServiceColumn
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({ data }) => {
  const router = useRouter()

  const onAddTransaction = async () => {
    try {
      await axios.post("/api/transactions", data)
      router.refresh()
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
