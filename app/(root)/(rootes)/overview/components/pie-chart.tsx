import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts"
import { PieChartData, View } from "@/types"

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
  isoString: String
  setIncome: React.Dispatch<React.SetStateAction<number>>
  setExpense: React.Dispatch<React.SetStateAction<number>>
  view: View
}

const CustomActiveShapePieChart: React.FC<CustomActiveShapePieChartProps> = ({
  isoString,
  setIncome,
  setExpense,
  view,
}) => {
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  useEffect(() => {
    axios.get(`/api/transactions/monthly?dateISO=${isoString}&view=${view}`).then((res) => {
      setPieChartData(res.data.pieChartData)
      setIncome(res.data.income)
      setExpense(res.data.expense)
    })
  }, [isoString])

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={pieChartData}
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {pieChartData.map((data) => (
            <Cell fill={data.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomActiveShapePieChart
