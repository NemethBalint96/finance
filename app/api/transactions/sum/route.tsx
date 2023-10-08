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
      const date = new Date(parseInt(year), parseInt(month), parseInt(day))
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

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

      const weeklyTotal = transactions.reduce((total, transaction) => total + transaction.price, 0)

      return NextResponse.json(weeklyTotal)
    }

    return new NextResponse("Incorrect params", { status: 400 })
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
