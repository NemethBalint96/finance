import prismadb from "@/lib/prismadb"
import { ServiceForm } from "./components/service-form"

const ServicePage = async ({ params }: { params: { serviceId: string } }) => {
  const service = await prismadb.service.findUnique({ where: { id: params.serviceId } })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ServiceForm initialData={service} />
      </div>
    </div>
  )
}

export default ServicePage
