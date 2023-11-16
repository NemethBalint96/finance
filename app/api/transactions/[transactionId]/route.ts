import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface TransactionRouteProps {
  params: { transactionId: string }
}

export async function PATCH(req: Request, { params }: TransactionRouteProps) {
  try {
    if (!params.transactionId) return new NextResponse("Transaction id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const body = await req.json()
    const { name, price, categoryId, transactionDate } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })
    if (!price) return new NextResponse("Price is required", { status: 400 })
    const newDate = new Date(transactionDate)
    newDate.setHours(newDate.getHours() + 1)
    const transaction = await prismadb.transaction.updateMany({
      where: { id: params.transactionId },
      data: { name, price, categoryId, transactionDate: newDate },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: TransactionRouteProps) {
  try {
    if (!params.transactionId) return new NextResponse("Transaction id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const transaction = await prismadb.transaction.deleteMany({ where: { id: params.transactionId } })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
