import { format } from "date-fns"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import IncomeClient from "./components/client"
import { TransactionColumn } from "./components/columns"
import { getTodayIncome } from "@/actions/get-today-income"

const IncomePage = async () => {
  const { userId } = auth()
  if (!userId) return

  const todayIncome = await getTodayIncome(userId)
  const income = await prismadb.transaction.findMany({
    where: { userId, price: { gt: 0 } },
    orderBy: { createdAt: "desc" },
  })

  const formattedIncome: TransactionColumn[] = income.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "MMM dd yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IncomeClient
          todayData={todayIncome}
          data={formattedIncome}
        />
      </div>
    </div>
  )
}

export default IncomePage
