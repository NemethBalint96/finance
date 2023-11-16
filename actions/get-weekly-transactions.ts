import prismadb from "@/lib/prismadb"

export interface WhereClause {
  userId: string
  transactionDate: { gte: Date; lte?: Date }
  price?: { gt?: number; lt?: number }
}

export const getWeeklyTransactions = async (userId: string) => {
  const startOfWeek = new Date()
  startOfWeek.setHours(0, 0, 0, 0)
  let day = startOfWeek.getDay()
  if (day === 0) day = 7
  startOfWeek.setDate(startOfWeek.getDate() - day + 1)

  const weeklyTransactions = await prismadb.transaction.findMany({
    where: {
      userId,
      transactionDate: { gte: startOfWeek },
    },
  })

  return weeklyTransactions
}
