"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  accentColor: "green" | "blue" | "purple" | "yellow"
}

function MetricCard({ title, value, subtitle, accentColor }: MetricCardProps) {
  const accentClasses = {
    green: "bg-success",
    blue: "bg-primary",
    purple: "bg-accent",
    yellow: "bg-warning",
  }

  return (
    <div className="relative bg-card border border-border rounded-lg p-5 overflow-hidden hover:border-muted transition-colors">
      {/* Top accent line */}
      <div className={cn("absolute top-0 left-0 right-0 h-1", accentClasses[accentColor])} />
      
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </p>
      <p className="text-2xl font-semibold text-foreground font-mono mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Net Worth"
        value="$84,247"
        subtitle="+8.34% · +$6,472 today"
        accentColor="green"
      />
      <MetricCard
        title="Total Invested"
        value="$61,000"
        subtitle="ROI +38.1%"
        accentColor="blue"
      />
      <MetricCard
        title="DeFi Yield APY"
        value="14.7%"
        subtitle="3 active pools · Aave + Curve"
        accentColor="purple"
      />
      <MetricCard
        title="Gas Spent (30d)"
        value="$342"
        subtitle="▼ -12% vs last month"
        accentColor="yellow"
      />
    </div>
  )
}
