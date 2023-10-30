import prismadb from "@/lib/prismadb"
import { ExpenseForm } from "./components/expense-form"
import { auth } from "@clerk/nextjs"

const ExpensePage = async ({ params }: { params: { expenseId: string } }) => {
  const { userId } = auth()
  if (!userId) return null

  const expense = await prismadb.transaction.findUnique({
    where: { id: params.expenseId },
    include: { category: true },
  })
  console.log(expense)

  const categories = await prismadb.transactionCategory.findMany({ where: { userId: userId } })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpenseForm
          initialData={expense}
          categories={categories}
        />
      </div>
    </div>
  )
}

export default ExpensePage
