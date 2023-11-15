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

    const { name, color } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const category = await prismadb.transactionCategory.create({ data: { name, userId, color } })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 })
    }

    const caregories = await prismadb.transactionCategory.findMany({ where: { userId } })

    return NextResponse.json(caregories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
