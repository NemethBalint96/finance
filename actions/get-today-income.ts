import { TodayIncomeColumn } from "@/app/(root)/(rootes)/income/components/columns"
import prismadb from "@/lib/prismadb"

export const getTodayIncome = async (userId: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dailyIncome = await prismadb.transaction.groupBy({
    by: ["name"],
    where: { userId: userId, createdAt: { gte: today }, price: { gt: 0 } },
    _count: { name: true },
    _sum: { price: true },
  })

  const formattedTodayIncome: TodayIncomeColumn[] = dailyIncome.map((item) => ({
    name: item.name,
    count: item._count.name,
    sum: item._sum.price !== null ? item._sum.price : 0,
  }))

  return formattedTodayIncome
}
