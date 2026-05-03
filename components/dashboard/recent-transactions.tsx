"use client"

import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  type: "buy" | "sell" | "swap" | "claim"
  title: string
  time: string
  amount: string
  positive: boolean
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "buy",
    title: "Bought ETH",
    time: "2 min ago",
    amount: "+0.5 ETH",
    positive: true,
  },
  {
    id: "2",
    type: "swap",
    title: "Swapped USDC→SOL",
    time: "47 min ago",
    amount: "500 USDC",
    positive: false,
  },
  {
    id: "3",
    type: "claim",
    title: "DeFi Yield Claim",
    time: "3 hrs ago",
    amount: "+$48.2",
    positive: true,
  },
  {
    id: "4",
    type: "sell",
    title: "Sold SOL",
    time: "Yesterday",
    amount: "-12 SOL",
    positive: false,
  },
]

const typeConfig = {
  buy: { icon: ArrowDownLeft, color: "text-success bg-success/10" },
  sell: { icon: ArrowUpRight, color: "text-destructive bg-destructive/10" },
  swap: { icon: ArrowLeftRight, color: "text-primary bg-primary/10" },
  claim: { icon: Gift, color: "text-success bg-success/10" },
}

export function RecentTransactions() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Transactions</h3>
      
      <div className="space-y-3">
        {transactions.map((tx) => {
          const config = typeConfig[tx.type]
          const Icon = config.icon

          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  config.color
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.title}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
              <p
                className={cn(
                  "text-sm font-mono font-medium",
                  tx.positive ? "text-success" : "text-muted-foreground"
                )}
              >
                {tx.amount}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
