export interface PieChartData {
  name: string
  value: number
  color: string
}

export interface GraphData {
  name: string
  income: number
  expense: number
}

export type View = "Income" | "Expense" | "Sum"
