import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 })
    }

    const { name, price, categoryId } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    const transaction = await prismadb.transaction.create({ data: { name, price, userId, categoryId } })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 })
    }

    const transaction = await prismadb.transaction.findMany({ where: { userId: userId } })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
