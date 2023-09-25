import { Equal, TrendingDown, TrendingUp } from "lucide-react"
import { formatter } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Overview from "@/components/overview"
import { auth } from "@clerk/nextjs"
import { getWeeklySum } from "@/actions/get-weekly-sum"
import { Separator } from "@/components/ui/separator"
import { getGraphTransactionsForThisWeek } from "@/actions/get-graph-transactions"

const DashboardPage: React.FC = async () => {
  const { userId } = auth()
  if (!userId) {
    return <div>Unauthorized</div>
  }
  const graphIncome = await getGraphTransactionsForThisWeek(userId)
  const graphExpense = await getGraphTransactionsForThisWeek(userId, false)
  const weeklyIncome = await getWeeklySum(userId)
  const weeklyExpense = await getWeeklySum(userId, false)
  const weeklySum = weeklyIncome + weeklyExpense

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Overview of your finance"
        />
        <Separator />
        <Heading
          title="This Week"
          description=""
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
              <div className="text-2xl font-bold">{formatter.format(weeklySum)}</div>
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
      </div>
    </div>
  )
}

export default DashboardPage
