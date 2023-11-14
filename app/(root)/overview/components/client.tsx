"use client"

import React, { useState } from "react"
import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { GraphData, PieChartData, View } from "@/types"
import PosNegBarChart from "./bar-chart"
import CustomActiveShapePieChart from "./pie-chart"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSumFromGraphData } from "@/actions/get-graph-transactions"

interface OverviewClientProps {
  initGraphData: GraphData[]
  initPieChartData: PieChartData[]
}

const OverviewClient = ({ initGraphData, initPieChartData }: OverviewClientProps) => {
  const [date, setDate] = useState<Date>()
  const [income, setIncome] = useState<number>(getSumFromGraphData(initGraphData))
  const [expense, setExpense] = useState<number>(getSumFromGraphData(initGraphData, false))
  const [isMonthView, setIsMonthView] = useState(false)
  const [view, setView] = useState<View>("Income")
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
        <Card
          onClick={() => setView("Income")}
          className={`${isMonthView ? "hover:cursor-pointer" : ""} ${
            isMonthView && view === "Income" ? "border-primary" : ""
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(income)}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => setView("Expense")}
          className={`${isMonthView ? "hover:cursor-pointer" : ""} ${
            isMonthView && view === "Expense" ? "border-primary" : ""
          }`}
        >
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
          {isMonthView ? (
            <CustomActiveShapePieChart
              initPieChartData={initPieChartData}
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
