import { Transaction } from "@prisma/client"
import { GraphData } from "@/types"
import { getWeeklyTransactions } from "./get-weekly-transactions"

const initValue = { income: 0, expense: 0 }

export const templateGraphData = (): GraphData[] => {
  return [
    { name: "Mon", ...initValue },
    { name: "Thu", ...initValue },
    { name: "Wed", ...initValue },
    { name: "Tue", ...initValue },
    { name: "Fri", ...initValue },
    { name: "Sat", ...initValue },
    { name: "Sun", ...initValue },
  ]
}

export const getSumFromGraphData = (graphData: GraphData[], income = true) => {
  return graphData.reduce((sum: number, data: GraphData) => sum + (income ? data.income : data.expense), 0)
}

export const getWeeklyGraphDataFromTransactions = (transactions: Transaction[]) => {
  const weeklyTransactions: { [key: number]: { income: number; expense: number } } = {}

  for (const transaction of transactions) {
    let day = transaction.transactionDate.getDay()
    if (day === 0) day = 6
    else day--

    if (!weeklyTransactions[day]) {
      weeklyTransactions[day] = { income: 0, expense: 0 }
    }

    if (transaction.price > 0) {
      weeklyTransactions[day].income = (weeklyTransactions[day]?.income || 0) + transaction.price
    } else {
      weeklyTransactions[day].expense = (weeklyTransactions[day]?.expense || 0) + transaction.price
    }
  }

  const graphData: GraphData[] = templateGraphData()

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
