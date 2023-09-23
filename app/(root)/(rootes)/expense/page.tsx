import prismadb from "@/lib/prismadb"
import ExpenseClient from "./components/client"
import { ExpenseColumn } from "./components/columns"
import { auth } from "@clerk/nextjs"
import { Transaction } from "@prisma/client"

const ExpensePage = async () => {
  let expense: Transaction[] = []

  const { userId } = auth()

  if (userId) {
    expense = await prismadb.transaction.findMany({
      where: { userId: userId, price: { lt: 0 } },
      orderBy: { createdAt: "desc" },
    })
  }

  const formattedExpense: ExpenseColumn[] = expense.map((item) => ({
    id: item.id,
    name: item.name,
    price: Math.abs(item.price),
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
