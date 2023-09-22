"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ArrowDownCircle, ArrowUpCircle, Home } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: <Home />,
      active: pathname === "/",
    },
    {
      href: "/income",
      label: <ArrowUpCircle />,
      active: pathname === "/income",
    },
    {
      href: "/expense",
      label: <ArrowDownCircle />,
      active: pathname === "/expense",
    },
    {
      href: "/example",
      label: "Example",
      active: pathname === "/example",
    },
  ]

  return (
    <nav className={cn("items-center justify-between w-full flex", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
          key={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
