import { format } from "date-fns"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import IncomeClient from "./components/client"
import { TransactionColumn } from "./components/columns"
import { getTodayIncome } from "@/actions/get-today-income"

const IncomePage = async () => {
  const { userId } = auth()
  if (!userId) return

  const formattedTodayIncome = await getTodayIncome(userId)
  const income = await prismadb.transaction.findMany({
    where: { userId: userId, price: { gt: 0 } },
    orderBy: { createdAt: "desc" },
  })

  const formattedIncome: TransactionColumn[] = income.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IncomeClient
          todayData={formattedTodayIncome}
          data={formattedIncome}
        />
      </div>
    </div>
  )
}

export default IncomePage
