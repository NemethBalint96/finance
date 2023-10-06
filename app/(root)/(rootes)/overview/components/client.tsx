"use client"

import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Overview from "@/components/overview"
import { GraphData } from "@/actions/get-graph-transactions"
import { DatePicker } from "@/components/ui/date-picker"
import React, { useEffect, useState } from "react"
import axios from "axios"

interface OverviewClientProps {
  initGraphIncome: GraphData[]
  initGraphExpense: GraphData[]
  initWeeklyIncome: number
  initWeeklyExpense: number
}

const OverviewClient: React.FC<OverviewClientProps> = ({
  initGraphIncome,
  initGraphExpense,
  initWeeklyIncome,
  initWeeklyExpense,
}) => {
  const [date, setDate] = useState<Date>()
  const [graphIncome, setGraphIncome] = useState<GraphData[]>(initGraphIncome)
  const [graphExpense, setGraphExpense] = useState<GraphData[]>(initGraphExpense)
  const [weeklyIncome, setWeeklyIncome] = useState<number>(initWeeklyIncome)
  const [weeklyExpense, setWeeklyExpense] = useState<number>(initWeeklyExpense)

  useEffect(() => {
    if (date) {
      axios
        .get(
          `/api/transactions/weekly?year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}&income=true`
        )
        .then((res) => {
          setGraphIncome(res.data)
        })
      axios
        .get(`/api/transactions/weekly?year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}`)
        .then((res) => {
          setGraphExpense(res.data)
        })
      axios
        .get(
          `/api/transactions/sum?year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}&income=true`
        )
        .then((res) => {
          setWeeklyIncome(res.data)
        })
      axios
        .get(`/api/transactions/sum?year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}`)
        .then((res) => {
          setWeeklyExpense(res.data)
        })
    }
    console.log(date)
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
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview
            data={graphIncome}
            color="#3498db"
          />
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Expense</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview
            data={graphExpense}
            color="#db3449"
          />
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewClient
