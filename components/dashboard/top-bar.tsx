"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function TopBar() {
  const [blockNumber, setBlockNumber] = useState(19847523)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber((prev) => prev + 1)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* Left - Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Portfolio Overview</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Block #{blockNumber.toLocaleString()}
        </p>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-4">
        {/* Live Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-dot"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </span>
          <span className="text-xs font-semibold text-success">LIVE</span>
        </div>

        {/* Period Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          24H
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
