import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse("Unathenticated", { status: 401 })

    const body = await req.json()
    const { name, price, color } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })
    if (!price) return new NextResponse("Price is required", { status: 400 })

    const service = await prismadb.service.create({ data: { name, price, userId } })
    await prismadb.transactionCategory.create({ data: { name, color, userId, serviceId: service.id } })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
