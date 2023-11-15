import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse("Unathenticated", { status: 401 })

    const body = await req.json()
    const { name, color } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })

    const category = await prismadb.transactionCategory.create({ data: { name, userId, color } })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
