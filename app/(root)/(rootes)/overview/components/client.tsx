"use client"

import React, { useState } from "react"
import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { GraphData, View } from "@/types"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PosNegBarChart from "./bar-chart"
import CustomActiveShapePieChart from "./pie-chart"

interface OverviewClientProps {
  initGraphData: GraphData[]
  initWeeklyIncome: number
  initWeeklyExpense: number
}

const OverviewClient: React.FC<OverviewClientProps> = ({ initGraphData, initWeeklyIncome, initWeeklyExpense }) => {
  const [date, setDate] = useState<Date>()
  const [income, setIncome] = useState<number>(initWeeklyIncome)
  const [expense, setExpense] = useState<number>(initWeeklyExpense)
  const [isMonthView, setIsMonthView] = useState(false)
  const [view, setView] = useState<View>("Sum")
  const isoString = date ? date.toISOString() : new Date().toISOString()

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
        <Card onClick={() => setView("Income")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(income)}</div>
          </CardContent>
        </Card>
        <Card onClick={() => setView("Expense")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(expense)}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => setView("Sum")}
          className="col-span-2"
        >
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
          {isMonthView ? (
            <CustomActiveShapePieChart
              isoString={isoString}
              setIncome={setIncome}
              setExpense={setExpense}
              view={view}
            />
          ) : (
            <PosNegBarChart
              initGraphData={initGraphData}
              isoString={isoString}
              setIncome={setIncome}
              setExpense={setExpense}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewClient
