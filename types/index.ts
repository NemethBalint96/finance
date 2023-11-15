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

export type View = "Income" | "Expense"

export type TransactionColumn = {
  id: string
  name: string
  price: number
  transactionDate: string
}
