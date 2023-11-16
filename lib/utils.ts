import { format } from "date-fns"
import { hu } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
})

export const formatDateTime = (date: Date): string => {
  return format(date, "MMM dd yyyy HH:mm", { locale: hu })
}
