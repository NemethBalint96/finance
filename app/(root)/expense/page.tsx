import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import { TransactionColumn } from "@/types"
import { formatDateTime } from "@/lib/utils"
import ExpenseClient from "./components/client"

const ExpensePage = async () => {
  const { userId } = auth()
  if (!userId) return

  const expense = await prismadb.transaction.findMany({
    where: { userId, price: { lt: 0 } },
    orderBy: { transactionDate: "desc" },
  })
  const formattedExpense: TransactionColumn[] = expense.map((item) => ({
    ...item,
    price: Math.abs(item.price),
    transactionDate: formatDateTime(item.transactionDate),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpenseClient data={formattedExpense} />
      </div>
    </div>
  )
}

export default ExpensePage
