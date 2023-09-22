import prismadb from "@/lib/prismadb"
import { ExpenseForm } from "./components/expense-form"

const ExpensePage = async ({ params }: { params: { expenseId: string } }) => {
  const expense = await prismadb.transaction.findUnique({ where: { id: params.expenseId } })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpenseForm initialData={expense} />
      </div>
    </div>
  )
}

export default ExpensePage
