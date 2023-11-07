import prismadb from "@/lib/prismadb"
import { ServiceForm } from "./components/service-form"

const ServicePage = async ({ params }: { params: { serviceId: string } }) => {
  const service = await prismadb.service.findUnique({ where: { id: params.serviceId }, include: { category: true } })

  const initialData = service
    ? { name: service.name, price: service.price, color: service.category?.color || undefined }
    : null

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ServiceForm initialData={initialData} />
      </div>
    </div>
  )
}

export default ServicePage
