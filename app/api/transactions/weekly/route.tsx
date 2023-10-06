import { GraphData } from "@/actions/get-graph-transactions"
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
    const year = searchParams.get("year")
    const month = searchParams.get("month")
    const day = searchParams.get("day")
    const income = searchParams.get("income")

    if (typeof year === "string" && typeof month === "string" && typeof day === "string") {
      const date = new Date(parseInt(year), parseInt(month), parseInt(day) + 1)
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 7)

      const whereClause: WhereClause = {
        userId: userId,
        createdAt: { gte: startOfWeek, lte: endOfWeek },
      }

      if (income) {
        whereClause.price = { gt: 0 }
      } else {
        whereClause.price = { lt: 0 }
      }

      const transactions = await prismadb.transaction.findMany({
        where: whereClause,
      })

      const weeklyTransactions: { [key: number]: number } = {}

      for (const transaction of transactions) {
        const day = transaction.createdAt.getDay()
        weeklyTransactions[day] = (weeklyTransactions[day] || 0) + transaction.price
      }

      const graphData: GraphData[] = [
        { name: "Sun", total: 0 },
        { name: "Mon", total: 0 },
        { name: "Thu", total: 0 },
        { name: "Wed", total: 0 },
        { name: "Tue", total: 0 },
        { name: "Fri", total: 0 },
        { name: "Sat", total: 0 },
      ]

      for (const day in weeklyTransactions) {
        graphData[parseInt(day)].total = weeklyTransactions[parseInt(day)]
      }

      return NextResponse.json(graphData)
    }

    return new NextResponse("Incorrect params", { status: 400 })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
