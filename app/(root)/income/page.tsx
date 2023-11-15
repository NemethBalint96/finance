import { format } from "date-fns"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import { TransactionColumn } from "@/types"
import IncomeClient from "./components/client"
import { getTodayIncome } from "@/actions/get-today-income"

const IncomePage = async () => {
  const { userId } = auth()
  if (!userId) return

  const todayIncome = await getTodayIncome(userId)
  const income = await prismadb.transaction.findMany({
    where: { userId, price: { gt: 0 } },
    orderBy: { transactionDate: "desc" },
  })
  const formattedIncome: TransactionColumn[] = income.map((item) => ({
    ...item,
    transactionDate: format(item.transactionDate, "MMM dd yyyy"),
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
