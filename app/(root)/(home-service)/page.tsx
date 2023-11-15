import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import ServicesClient from "./components/client"

const ServicesPage = async () => {
  const { userId } = auth()
  if (!userId) return

  const servicesWithCategory = await prismadb.service.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { price: "asc" },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ServicesClient data={servicesWithCategory} />
      </div>
    </div>
  )
}

export default ServicesPage
