"use client"

import { Fuel, Clock, TrendingUp, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  badge: string
  badgeColor: "green" | "blue" | "yellow"
}

function StatCard({ icon: Icon, label, value, badge, badgeColor }: StatCardProps) {
  const badgeClasses = {
    green: "bg-success/10 text-success",
    blue: "bg-primary/10 text-primary",
    yellow: "bg-warning/10 text-warning",
  }

  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-mono font-semibold text-foreground">{value}</span>
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full",
            badgeClasses[badgeColor]
          )}
        >
          {badge}
        </span>
      </div>
    </div>
  )
}

export function NetworkStats() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Network Stats</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Fuel}
          label="Gas"
          value="18.4 Gwei"
          badge="Low"
          badgeColor="green"
        />
        <StatCard
          icon={Clock}
          label="Block Time"
          value="12.1s"
          badge="Normal"
          badgeColor="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="BTC Dominance"
          value="54.2%"
          badge="Stable"
          badgeColor="yellow"
        />
        <StatCard
          icon={Activity}
          label="Fear & Greed"
          value="72"
          badge="Greed"
          badgeColor="green"
        />
      </div>
    </div>
  )
}
