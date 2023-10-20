"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts"
import { formatter } from "@/lib/utils"
import { GraphData } from "@/actions/get-graph-transactions"

interface ChartProps {
  data: GraphData[]
}

const PosNegBarChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart
        data={data}
        stackOffset="sign"
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${formatter.format(value)}`}
        />
        <Tooltip labelClassName="text-gray-500" />
        <ReferenceLine
          y={0}
          stroke="#808080"
        />
        <Bar
          dataKey="income"
          fill="#3498db"
          stackId="0"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expense"
          fill="#db3449"
          stackId="0"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PosNegBarChart
