import { Transaction } from "@prisma/client"
import { getWeeklyTransactions } from "./get-weekly-transactions"

export interface GraphData {
  name: string
  income: number
  expense: number
}

export const templateGraphData: GraphData[] = [
  { name: "Sun", income: 0, expense: 0 },
  { name: "Mon", income: 0, expense: 0 },
  { name: "Thu", income: 0, expense: 0 },
  { name: "Wed", income: 0, expense: 0 },
  { name: "Tue", income: 0, expense: 0 },
  { name: "Fri", income: 0, expense: 0 },
  { name: "Sat", income: 0, expense: 0 },
]

export const getSumFromGraphData = (graphData: GraphData[], income = true) => {
  return graphData.reduce((sum: number, data: GraphData) => sum + (income ? data.income : data.expense), 0)
}

export const getWeeklyGraphDataFromTransactions = (transactions: Transaction[]) => {
  const weeklyTransactions: { [key: number]: { income: number; expense: number } } = {}

  for (const transaction of transactions) {
    const day = transaction.createdAt.getDay()

    if (!weeklyTransactions[day]) {
      weeklyTransactions[day] = { income: 0, expense: 0 }
    }

    if (transaction.price > 0) {
      weeklyTransactions[day].income = (weeklyTransactions[day]?.income || 0) + transaction.price
    } else {
      weeklyTransactions[day].expense = (weeklyTransactions[day]?.expense || 0) + transaction.price
    }
  }

  const graphData: GraphData[] = templateGraphData

  for (const day in weeklyTransactions) {
    graphData[parseInt(day)].income = weeklyTransactions[parseInt(day)].income
    graphData[parseInt(day)].expense = weeklyTransactions[parseInt(day)].expense
  }

  return graphData
}

export const getGraphTransactionsForThisWeek = async (userId: string) => {
  const transactions = await getWeeklyTransactions(userId)

  return getWeeklyGraphDataFromTransactions(transactions)
}
