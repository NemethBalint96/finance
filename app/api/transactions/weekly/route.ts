import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { WhereClause } from "@/actions/get-weekly-transactions"
import { getWeeklyGraphDataFromTransactions } from "@/actions/get-graph-transactions"

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse("Unathenticated", { status: 401 })

    const { searchParams } = new URL(req.url)
    const isoString = searchParams.get("dateISO")
    if (!isoString) return new NextResponse("Incorrect params", { status: 400 })

    const date = new Date(isoString)
    const startOfWeek = new Date(date)
    let day = date.getDay()
    if (day === 0) day = 7
    startOfWeek.setDate(date.getDate() - day + 1)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)

    const whereClause: WhereClause = {
      userId,
      transactionDate: { gte: startOfWeek, lte: endOfWeek },
    }

    const transactions = await prismadb.transaction.findMany({
      where: whereClause,
    })

    const graphData = getWeeklyGraphDataFromTransactions(transactions)

    return NextResponse.json(graphData)
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
