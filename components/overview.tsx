"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { formatter } from "@/lib/utils"

interface OverviewProps {
  data: any[]
  color: string
}

const Overview: React.FC<OverviewProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
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
        <Bar
          dataKey="total"
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview
