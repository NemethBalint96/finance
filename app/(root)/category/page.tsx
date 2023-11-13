import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import CategoryClient from "./components/client"
import { CategoryColumn } from "./components/columns"

const CategoryPage = async () => {
  const { userId } = auth()
  if (!userId) return

  const categories = await prismadb.transactionCategory.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  })

  const formattedExpense: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
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
