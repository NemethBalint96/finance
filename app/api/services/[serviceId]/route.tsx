import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { serviceId: string } }) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Service id is required", { status: 400 })
    }

    const service = await prismadb.service.findUnique({ where: { id: params.serviceId } })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { serviceId: string } }) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Service id is required", { status: 400 })
    }

    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const body = await req.json()
    const { name, price } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    const service = await prismadb.service.updateMany({
      where: { id: params.serviceId },
      data: { name, price },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; serviceId: string } }) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Service id is required", { status: 400 })
    }

    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const service = await prismadb.service.deleteMany({ where: { id: params.serviceId } })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
