import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { transactionId: string } }) {
  try {
    if (!params.transactionId) {
      return new NextResponse("Transaction id is required", { status: 400 })
    }

    const transaction = await prismadb.transaction.findUnique({ where: { id: params.transactionId } })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { transactionId: string } }) {
  try {
    if (!params.transactionId) {
      return new NextResponse("Transaction id is required", { status: 400 })
    }

    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const body = await req.json()
    const { name, price, categoryId } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    const transaction = await prismadb.transaction.updateMany({
      where: { id: params.transactionId },
      data: { name, price, categoryId },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; transactionId: string } }) {
  try {
    if (!params.transactionId) {
      return new NextResponse("Transaction id is required", { status: 400 })
    }

    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const transaction = await prismadb.transaction.deleteMany({ where: { id: params.transactionId } })

    return NextResponse.json(transaction)
  } catch (error) {
    console.log("[TRANSACTION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
