import prismadb from "@/lib/prismadb"
import { PieChartData } from "@/types"
import { WhereClause } from "./get-weekly-transactions"

export const getMonthlyChartData = async (userId: string) => {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  const endOfMonth = new Date(startOfMonth)
  endOfMonth.setMonth(startOfMonth.getMonth() + 1)

  const whereClause: WhereClause = {
    userId: userId,
    createdAt: { gte: startOfMonth, lte: endOfMonth },
  }

  const monthlytransactionsWithCategory = await prismadb.transaction.findMany({
    where: { ...whereClause },
    include: { category: true },
  })

  const groupedTransactions = monthlytransactionsWithCategory.reduce(
    (result: { [key: string]: PieChartData }, transaction) => {
      const categoryName = transaction.category?.name || (transaction.price > 0 ? "Income" : "Expense")
      const categoryColor = transaction.category?.color || (transaction.price > 0 ? "#3498db" : "#db3449")

      if (!result[categoryName]) {
        result[categoryName] = {
          name: categoryName,
          value: 0,
          color: categoryColor,
        }
      }

      result[categoryName].value += transaction.price
      return result
    },
    {}
  )

  const groupedTransactionArray: PieChartData[] = Object.values(groupedTransactions)
  return groupedTransactionArray
}

export const getSumFromPieChartData = (pieChartData: PieChartData[], income = true) => {
  return pieChartData.reduce((sum: number, data: PieChartData) => {
    const isIncome = income ? data.value > 0 : data.value < 0
    return isIncome ? sum + data.value : sum
  }, 0)
}
