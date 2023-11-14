import { WhereClause } from "@/actions/get-weekly-transactions"
import prismadb from "@/lib/prismadb"
import { PieChartData, View } from "@/types"
import { auth } from "@clerk/nextjs"
import { Transaction } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse("Unathenticated", { status: 401 })

    const { searchParams } = new URL(req.url)
    const isoString = searchParams.get("dateISO")
    const view = searchParams.get("view") as View

    if (!isoString) return new NextResponse("Incorrect params", { status: 400 })

    const date = new Date(isoString)
    const startOfMonth = new Date(date)
    startOfMonth.setDate(1)
    const endOfMonth = new Date(startOfMonth)
    endOfMonth.setMonth(startOfMonth.getMonth() + 1)

    const whereClause: WhereClause = {
      userId: userId,
      createdAt: { gte: startOfMonth, lte: endOfMonth },
    }

    const viewClause = { price: view === "Income" ? { gt: 0 } : { lt: 0 } }

    const monthlytransactionsWithCategory = await prismadb.transaction.findMany({
      where: {
        ...whereClause,
        //  ...viewClause
      },
      include: { category: true },
    })

    const income = monthlytransactionsWithCategory.reduce(
      (sum: number, transaction: Transaction) => (transaction.price > 0 ? sum + transaction.price : sum),
      0
    )

    const expense = monthlytransactionsWithCategory.reduce(
      (sum: number, transaction: Transaction) => (transaction.price < 0 ? sum + transaction.price : sum),
      0
    )

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

    return NextResponse.json({ income: income, expense: expense, pieChartData: groupedTransactionArray })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
