import { format } from "date-fns"
import prismadb from "@/lib/prismadb"
import IncomeClient from "./components/client"
import { TodayIncomeColumn, TransactionColumn } from "./components/columns"
import { auth } from "@clerk/nextjs"
import { Transaction } from "@prisma/client"

const IncomePage = async ({ params }: { params: { storeId: string } }) => {
  let income: Transaction[] = []
  let formattedTodayIncome: TodayIncomeColumn[] = []

  const { userId } = auth()

  if (userId) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dailyIncome = await prismadb.transaction.groupBy({
      by: ["name"],
      where: { userId: userId, createdAt: { gte: today }, price: { gt: 0 } },
      _count: { name: true },
      _sum: { price: true },
    })

    formattedTodayIncome = dailyIncome.map((item) => ({
      name: item.name,
      count: item._count.name,
      sum: item._sum.price !== null ? item._sum.price : 0,
    }))

    income = await prismadb.transaction.findMany({
      where: { userId: userId, price: { gt: 0 } },
      orderBy: { createdAt: "desc" },
    })
  }

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
