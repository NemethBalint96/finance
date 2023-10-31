"use client"

import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PosNegBarChart from "@/components/bar-chart"
import { GraphData, getSumFromGraphData } from "@/actions/get-graph-transactions"
import { DatePicker } from "@/components/ui/date-picker"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomActiveShapePieChart from "@/components/pie-chart"
import { PieChartData } from "@/types"

interface OverviewClientProps {
  initGraphData: GraphData[]
  initWeeklyIncome: number
  initWeeklyExpense: number
}

const OverviewClient: React.FC<OverviewClientProps> = ({ initGraphData, initWeeklyIncome, initWeeklyExpense }) => {
  const [date, setDate] = useState<Date>()
  const [graphData, setGraphData] = useState<GraphData[]>(initGraphData)
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([])
  const [income, setIncome] = useState<number>(initWeeklyIncome)
  const [expense, setExpense] = useState<number>(initWeeklyExpense)
  const [isMonthView, setIsMonthView] = useState(false)

  useEffect(() => {
    if (date || isMonthView) {
      const isoString = date ? date.toISOString() : new Date().toISOString()

      if (isMonthView) {
        axios.get(`/api/transactions/monthly?dateISO=${isoString}`).then((res) => {
          setPieChartData(res.data.pieChartData)
          setIncome(res.data.income)
          setExpense(res.data.expense)
        })
      } else {
        axios.get(`/api/transactions/weekly?dateISO=${isoString}`).then((res) => {
          setGraphData(res.data)
          const incomes = getSumFromGraphData(res.data)
          const expenses = getSumFromGraphData(res.data, false)
          setIncome(incomes)
          setExpense(expenses)
        })
      }
    }
  }, [date, isMonthView])

  const handleSelect = (e: string) => {
    setIsMonthView(e === "month")
  }

  return (
    <>
      <div className="flex justify-between space-x-4">
        <DatePicker
          date={date}
          setDate={setDate}
        />
        <Select
          onValueChange={handleSelect}
          defaultValue="week"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(income)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(expense)}</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sum</CardTitle>
            <Equal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(income + expense)}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          {isMonthView ? <CustomActiveShapePieChart data={pieChartData} /> : <PosNegBarChart data={graphData} />}
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewClient
