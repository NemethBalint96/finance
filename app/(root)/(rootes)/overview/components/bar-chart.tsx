"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts"
import { GraphData } from "@/types"
import { formatter } from "@/lib/utils"
import { getSumFromGraphData } from "@/actions/get-graph-transactions"

interface ChartProps {
  initGraphData: GraphData[]
  isoString: String
  setIncome: React.Dispatch<React.SetStateAction<number>>
  setExpense: React.Dispatch<React.SetStateAction<number>>
}

const PosNegBarChart: React.FC<ChartProps> = ({ initGraphData, isoString, setIncome, setExpense }) => {
  const [graphData, setGraphData] = useState<GraphData[]>(initGraphData)

  useEffect(() => {
    axios.get(`/api/transactions/weekly?dateISO=${isoString}`).then((res) => {
      setGraphData(res.data)
      const incomes = getSumFromGraphData(res.data)
      const expenses = getSumFromGraphData(res.data, false)
      setIncome(incomes)
      setExpense(expenses)
    })
  }, [isoString])

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart
        data={graphData}
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
