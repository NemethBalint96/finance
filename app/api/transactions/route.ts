import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse("Unathenticated", { status: 401 })

    const body = await req.json()
    const { name, price, categoryId, transactionDate } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })
    if (!price) return new NextResponse("Price is required", { status: 400 })

    const transaction = await prismadb.transaction.create({
      data: { name, price, userId, categoryId, transactionDate },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
