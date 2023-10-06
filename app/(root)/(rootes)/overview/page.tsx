import { Heading } from "@/components/ui/heading"
import { auth } from "@clerk/nextjs"
import { getWeeklySum } from "@/actions/get-weekly-sum"
import { Separator } from "@/components/ui/separator"
import { getGraphTransactionsForThisWeek } from "@/actions/get-graph-transactions"
import OverviewClient from "./components/client"

const DashboardPage: React.FC = async () => {
  const { userId } = auth()
  if (!userId) return <div>Unauthorized</div>

  const graphIncome = await getGraphTransactionsForThisWeek(userId)
  const graphExpense = await getGraphTransactionsForThisWeek(userId, false)
  const weeklyIncome = await getWeeklySum(userId)
  const weeklyExpense = await getWeeklySum(userId, false)

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
        <OverviewClient
          initGraphIncome={graphIncome}
          initGraphExpense={graphExpense}
          initWeeklyIncome={weeklyIncome}
          initWeeklyExpense={weeklyExpense}
        />
      </div>
    </div>
  )
}

export default DashboardPage
