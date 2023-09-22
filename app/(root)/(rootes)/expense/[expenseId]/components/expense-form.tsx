"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"
import { Service, Transaction } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { AlertModal } from "@/components/modals/alert-modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ExpenseFormProps {
  initialData: Transaction | null
}

const formSchema = z.object({ name: z.string().min(1), price: z.coerce.number().min(1) })

type ExpenseFormValues = z.infer<typeof formSchema>

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit expense" : "Create expense"
  const description = initialData ? "Edit expense" : "Add a new expense"
  const toastMessage = initialData ? "Expense updated." : "Expense created."
  const action = initialData ? "Save changes" : "Create"

  if (initialData) {
    initialData.price = Math.abs(initialData.price)
  }

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", price: 1 },
  })

  const onSubmit = async (data: ExpenseFormValues) => {
    try {
      setLoading(true)
      data.price = -data.price
      if (initialData) {
        await axios.patch(`/api/transactions/${params.expenseId}`, data)
      } else {
        await axios.post("/api/transactions", data)
      }
      router.refresh()
      router.push("/expense")
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/transactions/${params.serviceId}`)
      router.refresh()
      router.push("/")
      toast.success("Expense deleted.")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="service name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="ml-auto"
            disabled={loading}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
