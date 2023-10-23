import { WhereClause } from "@/actions/get-weekly-transactions"
import prismadb from "@/lib/prismadb"
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

      const transactions = await prismadb.transaction.findMany({
        where: whereClause,
      })

      const income = transactions.reduce(
        (sum: number, transaction: Transaction) => sum + (transaction.price > 0 ? transaction.price : 0),
        0
      )
      const expense = transactions.reduce(
        (sum: number, transaction: Transaction) => sum + (transaction.price < 0 ? transaction.price : 0),
        0
      )

      return NextResponse.json({ income: income, expense: expense })
    }

    return new NextResponse("Incorrect params", { status: 400 })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
