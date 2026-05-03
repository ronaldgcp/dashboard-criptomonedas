"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Coins,
  Image,
  Activity,
  Fuel,
  AlertTriangle,
  Bell,
  Settings,
} from "lucide-react"

const navItems = {
  main: [
    { name: "Overview", icon: LayoutDashboard, active: true },
    { name: "Portfolio", icon: Wallet, active: false },
    { name: "DeFi & Yield", icon: Coins, active: false },
    { name: "NFT Tracker", icon: Image, active: false },
  ],
  analytics: [
    { name: "On-Chain Data", icon: Activity, active: false },
    { name: "Gas Tracker", icon: Fuel, active: false },
    { name: "Whale Alerts", icon: AlertTriangle, active: false },
  ],
  account: [
    { name: "Alerts", icon: Bell, active: false },
    { name: "Settings", icon: Settings, active: false },
  ],
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[220px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm">
          Δ
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">ChainView</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Main Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Main
          </p>
          <ul className="space-y-1">
            {navItems.main.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Analytics Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Analytics
          </p>
          <ul className="space-y-1">
            {navItems.analytics.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </p>
          <ul className="space-y-1">
            {navItems.account.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Wallet Connection */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#141928] border border-border">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-dot"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </span>
          <span className="text-xs font-mono text-muted-foreground">0x3f4a...8d2c</span>
          <span className="text-[10px] text-success font-medium ml-auto">Connected</span>
        </div>
      </div>
    </aside>
  )
}
