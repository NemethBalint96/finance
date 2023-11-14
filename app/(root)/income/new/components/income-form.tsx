"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { TransactionCategory } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IncomeFormProps {
  categories: TransactionCategory[]
}

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().optional(),
})

type IncomeFormValues = z.infer<typeof formSchema>

const IncomeForm = ({ categories }: IncomeFormProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "Tip", price: 1, categoryId: "" },
  })

  const onSubmit = async (data: IncomeFormValues) => {
    try {
      setLoading(true)
      await axios.post("/api/transactions", data)
      router.refresh()
      router.push("/income")
      toast.success("Income created.")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Create income"
          description="Add a new income"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="income name"
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            Create
          </Button>
        </form>
      </Form>
    </>
  )
}

export default IncomeForm
