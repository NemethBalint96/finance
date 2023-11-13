import { auth } from "@clerk/nextjs"
import OverviewClient from "./components/client"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { getGraphTransactionsForThisWeek, getSumFromGraphData } from "@/actions/get-graph-transactions"

const DashboardPage = async () => {
  const { userId } = auth()
  if (!userId) return

  const graphData = await getGraphTransactionsForThisWeek(userId)
  const weeklyIncome = getSumFromGraphData(graphData)
  const weeklyExpense = getSumFromGraphData(graphData, false)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Overview of your finance"
        />
        <Separator />
        <OverviewClient
          initGraphData={graphData}
          initWeeklyIncome={weeklyIncome}
          initWeeklyExpense={weeklyExpense}
        />
      </div>
    </div>
  )
}

export default DashboardPage
