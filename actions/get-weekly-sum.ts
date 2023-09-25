import { getWeeklyTransactions } from "./get-weekly-transactions"

export const getWeeklySum = async (userId: string, income: boolean = true) => {
  const weeklyTransactions = await getWeeklyTransactions(userId, income)

  const weeklyTotal = weeklyTransactions.reduce((total, transaction) => total + transaction.price, 0)

  return weeklyTotal
}
