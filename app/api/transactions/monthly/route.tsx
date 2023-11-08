import { WhereClause } from "@/actions/get-weekly-transactions"
import prismadb from "@/lib/prismadb"
import { PieChartData } from "@/types"
import { auth } from "@clerk/nextjs"
import { Transaction } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 })
    }
    const { searchParams } = new URL(req.url)
    const isoString = searchParams.get("dateISO")

    if (isoString) {
      const date = new Date(isoString)
      const startOfMonth = new Date(date)
      startOfMonth.setDate(1)
      const endOfMonth = new Date(startOfMonth)
      endOfMonth.setMonth(startOfMonth.getMonth() + 1)

      const whereClause: WhereClause = {
        userId: userId,
        createdAt: { gte: startOfMonth, lte: endOfMonth },
      }

      const monthlytransactionsWithCategory = await prismadb.transaction.findMany({
        where: whereClause,
        include: { category: true },
      })

      const incomes = await prismadb.transaction.findMany({
        where: { ...whereClause, price: { gt: 0 } },
      })

      const expenses = await prismadb.transaction.findMany({
        where: { ...whereClause, price: { lt: 0 } },
      })

      const income = incomes.reduce((sum: number, transaction: Transaction) => sum + transaction.price, 0)

      const expense = expenses.reduce((sum: number, transaction: Transaction) => sum + transaction.price, 0)

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

          result[categoryName].value += Math.abs(transaction.price)
          return result
        },
        {}
      )

      const groupedTransactionArray: PieChartData[] = Object.values(groupedTransactions)

      return NextResponse.json({ income: income, expense: expense, pieChartData: groupedTransactionArray })
    }

    return new NextResponse("Incorrect params", { status: 400 })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
