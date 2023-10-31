import { PieChartData } from "@/types"
import React, { useCallback, useState } from "react"
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts"

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill={fill}
      >
        {`${payload.name} ${value}`}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

interface CustomActiveShapePieChartProps {
  data: PieChartData[]
}

const CustomActiveShapePieChart: React.FC<CustomActiveShapePieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((d) => (
            <Cell fill={d.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomActiveShapePieChart
