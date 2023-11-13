interface ColorCellProp {
  color?: string | null
}

const ColorCell = ({ color }: ColorCellProp) => {
  return (
    <div className="flex items-center gap-x-2">
      <div
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: color || undefined }}
      />
      {color}
    </div>
  )
}

export default ColorCell
