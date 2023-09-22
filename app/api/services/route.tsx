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

    const { name, price } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    const service = await prismadb.service.create({ data: { name, price, userId: userId } })

    return NextResponse.json(service)
  } catch (error) {
    console.log("[SERVICE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 })
    }

    const services = await prismadb.service.findMany({ where: { userId: userId } })

    return NextResponse.json(services)
  } catch (error) {
    console.log("[SERVICE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
