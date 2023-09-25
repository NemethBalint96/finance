import { getWeeklyTransactions } from "./get-weekly-transactions"

interface GraphData {
  name: string
  total: number
}

export const getGraphTransactionsForThisWeek = async (userId: string, income: boolean = true) => {
  const transactions = await getWeeklyTransactions(userId, income)

  const weeklyTransactions: { [key: number]: number } = {}

  for (const transaction of transactions) {
    const day = transaction.createdAt.getDay() - 1
    weeklyTransactions[day] = (weeklyTransactions[day] || 0) + transaction.price
  }

  const graphData: GraphData[] = [
    { name: "Mon", total: 0 },
    { name: "Thu", total: 0 },
    { name: "Wed", total: 0 },
    { name: "Tue", total: 0 },
    { name: "Fri", total: 0 },
    { name: "Sat", total: 0 },
    { name: "Sun", total: 0 },
  ]

  for (const day in weeklyTransactions) {
    graphData[parseInt(day)].total = weeklyTransactions[parseInt(day)]
  }

  return graphData
}
