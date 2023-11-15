import { getWeeklyGraphDataFromTransactions } from "@/actions/get-graph-transactions"
import { WhereClause } from "@/actions/get-weekly-transactions"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
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
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      const whereClause: WhereClause = {
        userId,
        createdAt: { gte: startOfWeek, lte: endOfWeek },
      }

      const transactions = await prismadb.transaction.findMany({
        where: whereClause,
      })

      const graphData = getWeeklyGraphDataFromTransactions(transactions)

      return NextResponse.json(graphData)
    }

    return new NextResponse("Incorrect params", { status: 400 })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
