"use client"

import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "warning" | "info" | "success"
  message: string
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "BTC approaching resistance at $68,500",
  },
  {
    id: "2",
    type: "info",
    message: "ETH Staking APY increased to 4.2% on Lido",
  },
  {
    id: "3",
    type: "success",
    message: "Portfolio hit new ATH — $84,247",
  },
  {
    id: "4",
    type: "warning",
    message: "Whale moved 12,400 ETH to Binance",
  },
]

const typeConfig = {
  warning: {
    dotColor: "bg-warning",
    bgColor: "bg-warning/5",
    borderColor: "border-warning/20",
  },
  info: {
    dotColor: "bg-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
  success: {
    dotColor: "bg-success",
    bgColor: "bg-success/5",
    borderColor: "border-success/20",
  },
}

export function SmartAlerts() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Smart Alerts</h3>
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type]

          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-colors hover:opacity-80 cursor-pointer",
                config.bgColor,
                config.borderColor
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                  config.dotColor
                )}
              />
              <p className="text-sm text-foreground leading-relaxed">{alert.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
