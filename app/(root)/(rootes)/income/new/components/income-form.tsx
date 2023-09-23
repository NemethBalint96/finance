"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({ name: z.string().min(1), price: z.coerce.number().min(1) })

type IncomeFormValues = z.infer<typeof formSchema>

export const IncomeForm: React.FC = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "Tip", price: 1 },
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
            Create
          </Button>
        </form>
      </Form>
    </>
  )
}
