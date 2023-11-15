import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface ServiceRouteProps {
  params: { serviceId: string }
}

export async function PATCH(req: Request, { params }: ServiceRouteProps) {
  try {
    if (!params.serviceId) return new NextResponse("Service id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const body = await req.json()
    const { name, price, color } = body
    if (!name) return new NextResponse("Name is required", { status: 400 })
    if (!price) return new NextResponse("Price is required", { status: 400 })

    const service = await prismadb.service.updateMany({
      where: { id: params.serviceId },
      data: { name, price },
    })

    const category = await prismadb.transactionCategory.updateMany({
      where: { serviceId: params.serviceId },
      data: { name, color },
    })

    if (category.count === 0) {
      await prismadb.transactionCategory.create({
        data: { name, color, userId, serviceId: params.serviceId },
      })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: ServiceRouteProps) {
  try {
    if (!params.serviceId) return new NextResponse("Service id is required", { status: 400 })

    const { userId } = auth()
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    const service = await prismadb.service.deleteMany({ where: { id: params.serviceId } })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
