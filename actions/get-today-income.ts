import prismadb from "@/lib/prismadb"
import { TodayIncomeColumn } from "@/app/(root)/income/components/columns"

export const getTodayIncome = async (userId: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dailyIncome = await prismadb.transaction.groupBy({
    by: ["name"],
    where: { userId, transactionDate: { gte: today }, price: { gt: 0 } },
    _count: { name: true },
    _sum: { price: true },
  })

  const formattedTodayIncome: TodayIncomeColumn[] = dailyIncome.map((item) => ({
    name: item.name,
    count: item._count.name,
    sum: item._sum.price ? item._sum.price : 0,
  }))

  return formattedTodayIncome
}
