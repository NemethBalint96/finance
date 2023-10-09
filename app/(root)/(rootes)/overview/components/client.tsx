"use client"

import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Overview from "@/components/overview"
import { GraphData, getSumFromGraphData } from "@/actions/get-graph-transactions"
import { DatePicker } from "@/components/ui/date-picker"
import React, { useEffect, useState } from "react"
import axios from "axios"

interface OverviewClientProps {
  initGraphData: GraphData[]
  initWeeklyIncome: number
  initWeeklyExpense: number
}

const OverviewClient: React.FC<OverviewClientProps> = ({ initGraphData, initWeeklyIncome, initWeeklyExpense }) => {
  const [date, setDate] = useState<Date>()
  const [graphData, setGraphData] = useState<GraphData[]>(initGraphData)
  const [weeklyIncome, setWeeklyIncome] = useState<number>(initWeeklyIncome)
  const [weeklyExpense, setWeeklyExpense] = useState<number>(initWeeklyExpense)

  useEffect(() => {
    if (date) {
      axios.get(`/api/transactions/weekly?dateISO=${date.toISOString()}`).then((res) => {
        setGraphData(res.data)
        const incomes = getSumFromGraphData(res.data)
        const expenses = getSumFromGraphData(res.data, false)
        setWeeklyIncome(incomes)
        setWeeklyExpense(expenses)
      })
    }
  }, [date])

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
      />
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(weeklyIncome)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(weeklyExpense)}</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sum</CardTitle>
            <Equal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(weeklyIncome + weeklyExpense)}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphData} />
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewClient
