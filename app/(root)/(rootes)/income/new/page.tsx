import { IncomeForm } from "./components/income-form"

const ExpensePage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IncomeForm />
      </div>
    </div>
  )
}

export default ExpensePage
