import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface CategoryRouteProps {
  params: { categoryId: string }
}

export async function PATCH(req: Request, { params }: CategoryRouteProps) {
  try {
    if (!params.categoryId) return new NextResponse("Category id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const body = await req.json()
    const { name, color } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })

    const category = await prismadb.transactionCategory.updateMany({
      where: { id: params.categoryId },
      data: { name, color },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: CategoryRouteProps) {
  try {
    if (!params.categoryId) return new NextResponse("Category id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const category = await prismadb.transactionCategory.deleteMany({ where: { id: params.categoryId } })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
