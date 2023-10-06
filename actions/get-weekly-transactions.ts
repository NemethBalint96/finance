import prismadb from "@/lib/prismadb"

export interface WhereClause {
  userId: string
  createdAt: { gte: Date; lte?: Date }
  price?: { gt?: number; lt?: number }
}

export const getWeeklyTransactions = async (userId: string, income: boolean = true) => {
  const startOfWeek = new Date()
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const whereClause: WhereClause = {
    userId: userId,
    createdAt: { gte: startOfWeek },
  }

  if (income) {
    whereClause.price = { gt: 0 }
  } else {
    whereClause.price = { lt: 0 }
  }

  const weeklyTransactions = await prismadb.transaction.findMany({
    where: whereClause,
  })

  return weeklyTransactions
}
