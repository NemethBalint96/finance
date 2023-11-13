import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import ExpenseForm from "./components/expense-form"

interface ExpensePageProps {
  params: {
    expenseId: string
  }
}

const ExpensePage = async ({ params }: ExpensePageProps) => {
  const { userId } = auth()
  if (!userId) return

  const expense = await prismadb.transaction.findUnique({
    where: { id: params.expenseId },
    include: { category: true },
  })
  const categories = await prismadb.transactionCategory.findMany({ where: { userId: userId, serviceId: null } })

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
