import { CategoryColumn } from "@/app/(root)/(rootes)/category/components/columns"
import { ServiceColumn } from "@/app/(root)/(rootes)/components/columns"

interface ColorCellProp {
  data: ServiceColumn | CategoryColumn
}

const ColorCell = ({ data }: ColorCellProp) => {
  return (
    <div className="flex items-center gap-x-2">
      {data.color}
      <div
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: data.color || undefined }}
      />
    </div>
  )
}

export default ColorCell
