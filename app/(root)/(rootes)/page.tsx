import prismadb from "@/lib/prismadb"
import ServicesClient from "./components/client"
import { ServiceColumn } from "./components/columns"
import { auth } from "@clerk/nextjs"

const ServicesPage = async () => {
  const { userId } = auth()

  if (!userId) return null

  const services = await prismadb.service.findMany({
    where: { userId: userId },
    include: { category: true },
    orderBy: { price: "asc" },
  })

  const formattedServices: ServiceColumn[] = services.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    color: item.category?.color,
    categoryId: item.category?.id,
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ServicesClient data={formattedServices} />
      </div>
    </div>
  )
}

export default ServicesPage
