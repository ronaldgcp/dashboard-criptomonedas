"use client"

import { cn } from "@/lib/utils"

interface Holding {
  symbol: string
  name: string
  amount: string
  price: string
  change: number
  value: string
  color: string
}

const holdings: Holding[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: "0.82 units",
    price: "$67,420",
    change: 5.2,
    value: "$55,284",
    color: "#f7931a",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: "5.4 units",
    price: "$3,891",
    change: 3.7,
    value: "$21,011",
    color: "#627eea",
  },
  {
    symbol: "SOL",
    name: "Solana",
    amount: "38 units",
    price: "$178",
    change: -1.8,
    value: "$6,764",
    color: "#00d9a4",
  },
  {
    symbol: "USDC",
    name: "Stablecoin",
    amount: "1,188 units",
    price: "$1.00",
    change: 0,
    value: "$1,188",
    color: "#2775ca",
  },
]

export function HoldingsTable() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Holdings</h3>
      
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
        <span>Asset</span>
        <span>Price</span>
        <span className="text-right">24h</span>
        <span className="text-right">Value</span>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {holdings.map((holding) => (
          <div
            key={holding.symbol}
            className="grid grid-cols-4 gap-4 py-4 items-center hover:bg-secondary/50 -mx-5 px-5 transition-colors cursor-pointer"
          >
            {/* Asset */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ backgroundColor: holding.color }}
              >
                {holding.symbol.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{holding.symbol}</p>
                <p className="text-xs text-muted-foreground">{holding.amount}</p>
              </div>
            </div>

            {/* Price */}
            <p className="text-sm font-mono text-foreground">{holding.price}</p>

            {/* 24h Change */}
            <p
              className={cn(
                "text-sm font-mono text-right",
                holding.change > 0
                  ? "text-success"
                  : holding.change < 0
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {holding.change === 0
                ? "stable"
                : holding.change > 0
                ? `+${holding.change}%`
                : `${holding.change}%`}
            </p>

            {/* Value */}
            <p className="text-sm font-mono font-medium text-foreground text-right">
              {holding.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
