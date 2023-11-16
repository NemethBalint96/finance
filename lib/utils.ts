import { hu } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { formatInTimeZone } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
})

export const formatDate = (date: Date): string => {
  return formatInTimeZone(date, "Europe/Budapest", "MMM dd", { locale: hu })
}
