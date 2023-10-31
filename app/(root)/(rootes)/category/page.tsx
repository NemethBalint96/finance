import prismadb from "@/lib/prismadb"
import CategoryClient from "./components/client"
import { CategoryColumn } from "./components/columns"
import { auth } from "@clerk/nextjs"
import { TransactionCategory } from "@prisma/client"

const CategoryPage = async () => {
  let categories: TransactionCategory[] = []

  const { userId } = auth()

  if (userId) {
    categories = await prismadb.transactionCategory.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    })
  }

  const formattedExpense: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedExpense} />
      </div>
    </div>
  )
}

export default CategoryPage
