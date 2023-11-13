import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import IncomeForm from "./components/income-form"

const ExpensePage = async () => {
  const { userId } = auth()
  if (!userId) return

  const categories = await prismadb.transactionCategory.findMany({ where: { userId: userId, serviceId: null } })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IncomeForm categories={categories} />
      </div>
    </div>
  )
}

export default ExpensePage
