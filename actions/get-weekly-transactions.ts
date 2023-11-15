import prismadb from "@/lib/prismadb"

export interface WhereClause {
  userId: string
  createdAt: { gte: Date; lte?: Date }
  price?: { gt?: number; lt?: number }
}

export const getWeeklyTransactions = async (userId: string) => {
  const startOfWeek = new Date()
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const weeklyTransactions = await prismadb.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: startOfWeek },
    },
  })

  return weeklyTransactions
}
