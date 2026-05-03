"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Script from "next/script"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Coins,
  Image as ImageIcon,
  Activity,
  Fuel,
  AlertTriangle,
  Bell,
  Settings,
  ChevronDown,
  Clock,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Gift,
  User,
  Shield,
  Moon,
  Sun,
  Globe,
  Save,
  DollarSign,
  PiggyBank,
  Percent,
  Zap,
  BarChart3,
  Layers,
  FileCode,
  Timer,
} from "lucide-react"

// Types
type ViewType = "Overview" | "Portfolio" | "DeFi & Yield" | "NFT Tracker" | "On-Chain Data" | "Gas Tracker" | "Whale Alerts" | "Alerts" | "Settings"

interface NavItem {
  name: string
  icon: React.ElementType
  view?: ViewType
}

// Navigation Items
const navItems: { main: NavItem[]; analytics: NavItem[]; account: NavItem[] } = {
  main: [
    { name: "Overview", icon: LayoutDashboard, view: "Overview" },
    { name: "Portfolio", icon: Wallet, view: "Portfolio" },
    { name: "DeFi & Yield", icon: Coins, view: "DeFi & Yield" },
    { name: "NFT Tracker", icon: ImageIcon, view: "NFT Tracker" },
  ],
  analytics: [
    { name: "On-Chain Data", icon: Activity, view: "On-Chain Data" },
    { name: "Gas Tracker", icon: Fuel, view: "Gas Tracker" },
    { name: "Whale Alerts", icon: AlertTriangle, view: "Whale Alerts" },
  ],
  account: [
    { name: "Alerts", icon: Bell, view: "Alerts" },
    { name: "Settings", icon: Settings, view: "Settings" },
  ],
}

// Holdings Data
const holdings = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.82 units", price: "$67,420", change: 5.2, value: "$55,284", color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", amount: "5.4 units", price: "$3,891", change: 3.7, value: "$21,011", color: "#627eea" },
  { symbol: "SOL", name: "Solana", amount: "38 units", price: "$178", change: -1.8, value: "$6,764", color: "#00d9a4" },
  { symbol: "USDC", name: "Stablecoin", amount: "1,188 units", price: "$1.00", change: 0, value: "$1,188", color: "#2775ca" },
]

// Transactions Data
const transactions = [
  { id: "1", type: "buy" as const, title: "Bought ETH", time: "2 min ago", amount: "+0.5 ETH", positive: true },
  { id: "2", type: "swap" as const, title: "Swapped USDC→SOL", time: "47 min ago", amount: "500 USDC", positive: false },
  { id: "3", type: "claim" as const, title: "DeFi Yield Claim", time: "3 hrs ago", amount: "+$48.2", positive: true },
  { id: "4", type: "sell" as const, title: "Sold SOL", time: "Yesterday", amount: "-12 SOL", positive: false },
]

// Alerts Data
const alerts = [
  { id: "1", type: "warning" as const, message: "BTC approaching resistance at $68,500" },
  { id: "2", type: "info" as const, message: "ETH Staking APY increased to 4.2% on Lido" },
  { id: "3", type: "success" as const, message: "Portfolio hit new ATH - $84,247" },
  { id: "4", type: "warning" as const, message: "Whale moved 12,400 ETH to Binance" },
]

// Chart Data
const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [78000, 79500, 77200, 81000, 80400, 82800, 84247],
}

const portfolioChartData = {
  labels: ["Bitcoin", "Ethereum", "Solana", "USDC"],
  values: [55284, 21011, 6764, 1188],
  colors: ["#f7931a", "#627eea", "#00d9a4", "#2775ca"],
}

const allocationData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  btc: [45, 48, 50, 52, 54, 55],
  eth: [30, 28, 26, 25, 24, 25],
  sol: [15, 14, 14, 13, 12, 8],
  usdc: [10, 10, 10, 10, 10, 12],
}

// DeFi Pools Data
const defiPools = [
  { name: "Aave ETH", protocol: "Aave v3", apy: 4.2, tvl: "$12,400", deposited: "$8,200", earned: "$345", color: "#B6509E" },
  { name: "Curve 3Pool", protocol: "Curve Finance", apy: 8.7, tvl: "$5,800", deposited: "$3,100", earned: "$186", color: "#FF6B6B" },
  { name: "Lido stETH", protocol: "Lido", apy: 3.9, tvl: "$24,100", deposited: "$15,000", earned: "$412", color: "#00A3FF" },
]

const monthlyYieldData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [320, 410, 385, 520, 480, 612],
}

const claimsHistory = [
  { id: "1", pool: "Aave ETH", amount: "+$48.20", date: "Mar 18, 2026", status: "claimed" },
  { id: "2", pool: "Curve 3Pool", amount: "+$32.50", date: "Mar 15, 2026", status: "claimed" },
  { id: "3", pool: "Lido stETH", amount: "+$67.80", date: "Mar 12, 2026", status: "claimed" },
  { id: "4", pool: "Aave ETH", amount: "+$45.30", date: "Mar 08, 2026", status: "claimed" },
  { id: "5", pool: "Curve 3Pool", amount: "+$28.90", date: "Mar 05, 2026", status: "claimed" },
]

// NFT Data
const nfts = [
  { id: "1", name: "Bored Ape #7842", collection: "BAYC", floor: 28.5, bought: 32.1, rarity: "Rare", image: "#8B5CF6" },
  { id: "2", name: "CryptoPunk #3421", collection: "CryptoPunks", floor: 48.2, bought: 42.0, rarity: "Legendary", image: "#EC4899" },
  { id: "3", name: "Azuki #1284", collection: "Azuki", floor: 8.4, bought: 10.2, rarity: "Common", image: "#EF4444" },
  { id: "4", name: "Doodle #6721", collection: "Doodles", floor: 5.2, bought: 4.8, rarity: "Uncommon", image: "#F59E0B" },
  { id: "5", name: "CloneX #12847", collection: "CloneX", floor: 3.8, bought: 5.1, rarity: "Rare", image: "#10B981" },
  { id: "6", name: "Moonbird #4521", collection: "Moonbirds", floor: 2.1, bought: 3.4, rarity: "Common", image: "#3B82F6" },
  { id: "7", name: "Pudgy #8932", collection: "Pudgy Penguins", floor: 12.4, bought: 8.9, rarity: "Epic", image: "#06B6D4" },
]

const floorPriceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  bayc: [32, 30, 28, 27, 29, 28.5],
  punks: [45, 48, 52, 50, 49, 48.2],
  azuki: [12, 10, 9, 8.5, 8.2, 8.4],
}

// Gas Tracker Data
const gasData = {
  slow: { gwei: 12, time: "~10 min", usd: "$1.20" },
  standard: { gwei: 18, time: "~3 min", usd: "$1.80" },
  fast: { gwei: 28, time: "~30 sec", usd: "$2.80" },
}

const gas24hData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"],
  values: [14, 12, 22, 32, 28, 18, 18],
}

const gasCostEstimates = [
  { action: "ETH Transfer", slow: "$0.42", standard: "$0.63", fast: "$0.98" },
  { action: "ERC-20 Transfer", slow: "$1.20", standard: "$1.80", fast: "$2.80" },
  { action: "Uniswap Swap", slow: "$4.80", standard: "$7.20", fast: "$11.20" },
  { action: "NFT Mint", slow: "$6.40", standard: "$9.60", fast: "$14.90" },
  { action: "Contract Deploy", slow: "$48.00", standard: "$72.00", fast: "$112.00" },
]

// Whale Alerts Data
const whaleAlerts = [
  { id: "1", token: "BTC", amount: "1,240 BTC", value: "$83.6M", from: "Unknown", to: "Coinbase", time: "2 min ago", type: "exchange" },
  { id: "2", token: "ETH", amount: "12,400 ETH", value: "$48.2M", from: "Binance", to: "Unknown", time: "8 min ago", type: "withdrawal" },
  { id: "3", token: "USDT", amount: "50M USDT", value: "$50M", from: "Tether Treasury", to: "Binance", time: "15 min ago", type: "mint" },
  { id: "4", token: "BTC", amount: "890 BTC", value: "$60M", from: "Unknown", to: "Kraken", time: "32 min ago", type: "exchange" },
  { id: "5", token: "ETH", amount: "8,200 ETH", value: "$31.9M", from: "Lido", to: "Unknown", time: "1 hr ago", type: "withdrawal" },
  { id: "6", token: "SOL", amount: "420K SOL", value: "$74.8M", from: "Unknown", to: "FTX Cold", time: "2 hrs ago", type: "transfer" },
  { id: "7", token: "USDC", amount: "25M USDC", value: "$25M", from: "Circle", to: "Coinbase", time: "3 hrs ago", type: "mint" },
  { id: "8", token: "BTC", amount: "2,100 BTC", value: "$141.6M", from: "Mt.Gox Trustee", to: "Unknown", time: "4 hrs ago", type: "transfer" },
]

// User Alerts Data
const userAlerts = [
  { id: "1", name: "BTC Price Above $70k", type: "price", condition: "BTC > $70,000", enabled: true },
  { id: "2", name: "ETH Gas Below 15 Gwei", type: "gas", condition: "Gas < 15 Gwei", enabled: true },
  { id: "3", name: "Large Whale Movement", type: "whale", condition: "> $50M transfer", enabled: false },
  { id: "4", name: "Portfolio Down 5%", type: "portfolio", condition: "Portfolio < -5%", enabled: true },
  { id: "5", name: "Aave APY Change", type: "defi", condition: "APY change > 1%", enabled: true },
]

const alertHistory = [
  { id: "1", name: "BTC Price Above $70k", triggered: "Mar 18, 10:42 AM", status: "triggered" },
  { id: "2", name: "ETH Gas Below 15 Gwei", triggered: "Mar 17, 3:15 PM", status: "triggered" },
  { id: "3", name: "Portfolio Down 5%", triggered: "Mar 15, 9:30 AM", status: "resolved" },
  { id: "4", name: "Large Whale Movement", triggered: "Mar 14, 11:20 PM", status: "triggered" },
]

// On-Chain Data - Activity Heatmap (52 weeks x 7 days)
const generateHeatmapData = () => {
  const data: number[][] = []
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = []
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 5))
    }
    data.push(weekData)
  }
  return data
}
const heatmapData = generateHeatmapData()

const monthlyActivityData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  transactions: [42, 38, 56, 72, 64, 89, 78, 92, 68, 84, 96, 112],
  contracts: [8, 12, 15, 18, 22, 28, 24, 32, 26, 30, 35, 42],
}

const topContracts = [
  { id: "1", name: "Uniswap V3 Router", address: "0x68b3...4a2f", interactions: 156, volume: "$124,580", lastUsed: "2 hrs ago" },
  { id: "2", name: "Aave Lending Pool", address: "0x7d2f...8b3c", interactions: 89, volume: "$86,420", lastUsed: "1 day ago" },
  { id: "3", name: "OpenSea Seaport", address: "0x00000...0001", interactions: 67, volume: "$42,180", lastUsed: "3 days ago" },
  { id: "4", name: "Lido stETH", address: "0xae7a...9c4d", interactions: 45, volume: "$156,000", lastUsed: "5 days ago" },
  { id: "5", name: "Curve 3Pool", address: "0xbebc...2e1a", interactions: 34, volume: "$28,650", lastUsed: "1 week ago" },
]

// ============ SIDEBAR COMPONENT ============
function Sidebar({ activeView, setActiveView }: { activeView: ViewType; setActiveView: (view: ViewType) => void }) {
  const handleNavClick = (item: NavItem) => {
    if (item.view) {
      setActiveView(item.view)
    }
  }

  const isActive = (item: NavItem) => item.view === activeView

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[220px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-mono font-bold text-base shadow-lg shadow-primary/20 animate-glow">
          Δ
        </div>
        <div>
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">ChainView</span>
          <span className="text-[10px] font-semibold text-primary ml-1 bg-primary/10 px-1.5 py-0.5 rounded">PRO</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Main Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Main</p>
          <ul className="space-y-1">
            {navItems.main.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    !item.view && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!item.view}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Analytics Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Analytics</p>
          <ul className="space-y-1">
            {navItems.analytics.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    !item.view && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!item.view}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Section */}
        <div>
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Account</p>
          <ul className="space-y-1">
            {navItems.account.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    !item.view && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!item.view}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Wallet Connection */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#141928] border border-border card-hover cursor-pointer">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-dot"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </span>
          <span className="text-xs font-mono text-muted-foreground">0x3f4a...8d2c</span>
          <span className="text-[10px] text-success font-medium ml-auto">Connected</span>
        </div>
      </div>

      {/* Credit Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border bg-gradient-to-t from-[#0a0d14]/50 to-transparent">
        <p className="text-[10px] text-muted-foreground/60 text-center">
          Designed & Developed by
        </p>
        <p className="text-xs font-medium text-center gradient-text">
          Ronald Cubides
        </p>
      </div>
    </aside>
  )
}

// ============ TOP BAR COMPONENT ============
function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [blockNumber, setBlockNumber] = useState<number | null>(null)

  useEffect(() => {
    setBlockNumber(19847523)
    const interval = setInterval(() => {
      setBlockNumber((prev) => (prev ?? 19847523) + 1)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  const formatBlockNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <header className="h-20 border-b border-border bg-gradient-to-r from-card via-card to-card/50 flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-sm">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-xs font-mono text-muted-foreground" suppressHydrationWarning>
            {blockNumber !== null ? `Block #${formatBlockNumber(blockNumber)}` : "Block #..."}
          </p>
          {subtitle && (
            <>
              <span className="text-muted-foreground/30">|</span>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 shadow-lg shadow-success/5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-dot"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </span>
          <span className="text-xs font-bold text-success tracking-wider">LIVE</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium text-foreground hover:bg-muted hover:border-muted-foreground/20 transition-all">
          24H
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}

// ============ METRIC CARD COMPONENT ============
function MetricCard({ title, value, subtitle, accentColor, icon }: { title: string; value: string; subtitle: string; accentColor: "green" | "blue" | "purple" | "yellow"; icon?: React.ElementType }) {
  const accentClasses = { green: "bg-success", blue: "bg-primary", purple: "bg-accent", yellow: "bg-warning" }
  const iconBgClasses = { green: "bg-success/10 text-success", blue: "bg-primary/10 text-primary", purple: "bg-accent/10 text-accent", yellow: "bg-warning/10 text-warning" }
  const Icon = icon
  return (
    <div className="relative bg-card border border-border rounded-lg p-5 overflow-hidden card-hover group">
      <div className={cn("absolute top-0 left-0 right-0 h-1 accent-bar", accentClasses[accentColor])} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
          <p className="text-2xl font-semibold text-foreground font-mono mb-1 animate-count">{value}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {Icon && (
          <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", iconBgClasses[accentColor])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}

// ============ PORTFOLIO CHART COMPONENT ============
function PortfolioChart({ chartReady }: { chartReady: boolean }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<unknown>(null)
  const [period, setPeriod] = useState("1W")

  useEffect(() => {
    if (!chartReady || !chartRef.current) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    // Destroy existing chart
    if (chartInstanceRef.current) {
      (chartInstanceRef.current as { destroy: () => void }).destroy()
      chartInstanceRef.current = null
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, 0, 250)
    gradient.addColorStop(0, "rgba(0, 217, 126, 0.3)")
    gradient.addColorStop(1, "rgba(0, 217, 126, 0)")

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.values,
          borderColor: "#00d97e",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#00d97e",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#141928",
            titleColor: "#9ca3af",
            bodyColor: "#e5e7eb",
            borderColor: "#1e2535",
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: { label: (context: { parsed: { y: number } }) => `$${context.parsed.y.toLocaleString()}` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "#1e2535" },
            ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 }, callback: (value: number) => `$${(value / 1000).toFixed(0)}k` },
            border: { display: false },
          },
        },
        interaction: { intersect: false, mode: "index" as const },
      },
    })

    return () => {
      if (chartInstanceRef.current) {
        (chartInstanceRef.current as { destroy: () => void }).destroy()
        chartInstanceRef.current = null
      }
    }
  }, [chartReady, period])

  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Portfolio Performance</h3>
          <p className="text-2xl font-semibold font-mono text-foreground mt-1">$84,247</p>
          <p className="text-sm text-success">+8.34% this week</p>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          {["1D", "1W", "1M", "3M", "1Y"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

// ============ HOLDINGS TABLE COMPONENT ============
function HoldingsTable() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Holdings</h3>
      <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
        <span>Asset</span>
        <span>Price</span>
        <span className="text-right">24h</span>
        <span className="text-right">Value</span>
      </div>
      <div className="divide-y divide-border">
        {holdings.map((holding) => (
          <div key={holding.symbol} className="grid grid-cols-4 gap-4 py-4 items-center hover:bg-secondary/50 -mx-5 px-5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ backgroundColor: holding.color }}>
                {holding.symbol.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{holding.symbol}</p>
                <p className="text-xs text-muted-foreground">{holding.amount}</p>
              </div>
            </div>
            <p className="text-sm font-mono text-foreground">{holding.price}</p>
            <p className={cn("text-sm font-mono text-right", holding.change > 0 ? "text-success" : holding.change < 0 ? "text-destructive" : "text-muted-foreground")}>
              {holding.change === 0 ? "stable" : holding.change > 0 ? `+${holding.change}%` : `${holding.change}%`}
            </p>
            <p className="text-sm font-mono font-medium text-foreground text-right">{holding.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ NETWORK STATS COMPONENT ============
function NetworkStats() {
  const stats = [
    { icon: Fuel, label: "Gas", value: "18.4 Gwei", badge: "Low", badgeColor: "green" as const },
    { icon: Clock, label: "Block Time", value: "12.1s", badge: "Normal", badgeColor: "blue" as const },
    { icon: TrendingUp, label: "BTC Dominance", value: "54.2%", badge: "Stable", badgeColor: "yellow" as const },
    { icon: Activity, label: "Fear & Greed", value: "72", badge: "Greed", badgeColor: "green" as const },
  ]
  const badgeClasses = { green: "bg-success/10 text-success", blue: "bg-primary/10 text-primary", yellow: "bg-warning/10 text-warning" }

  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Network Stats</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono font-semibold text-foreground">{stat.value}</span>
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", badgeClasses[stat.badgeColor])}>{stat.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ RECENT TRANSACTIONS COMPONENT ============
function RecentTransactions() {
  const typeConfig = {
    buy: { icon: ArrowDownLeft, color: "text-success bg-success/10" },
    sell: { icon: ArrowUpRight, color: "text-destructive bg-destructive/10" },
    swap: { icon: ArrowLeftRight, color: "text-primary bg-primary/10" },
    claim: { icon: Gift, color: "text-success bg-success/10" },
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => {
          const config = typeConfig[tx.type]
          const Icon = config.icon
          return (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", config.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.title}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
              <p className={cn("text-sm font-mono font-medium", tx.positive ? "text-success" : "text-muted-foreground")}>{tx.amount}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============ SMART ALERTS COMPONENT ============
function SmartAlerts() {
  const typeConfig = {
    warning: { dotColor: "bg-warning", bgColor: "bg-warning/5", borderColor: "border-warning/20" },
    info: { dotColor: "bg-primary", bgColor: "bg-primary/5", borderColor: "border-primary/20" },
    success: { dotColor: "bg-success", bgColor: "bg-success/5", borderColor: "border-success/20" },
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Smart Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type]
          return (
            <div key={alert.id} className={cn("flex items-start gap-3 p-3 rounded-lg border transition-colors hover:opacity-80 cursor-pointer", config.bgColor, config.borderColor)}>
              <span className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", config.dotColor)} />
              <p className="text-sm text-foreground leading-relaxed">{alert.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============ OVERVIEW VIEW ============
function OverviewView({ chartReady }: { chartReady: boolean }) {
  return (
    <>
      <TopBar title="Portfolio Overview" subtitle="Real-time portfolio tracking" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Net Worth" value="$84,247" subtitle="+8.34% - +$6,472 today" accentColor="green" icon={DollarSign} />
          <MetricCard title="Total Invested" value="$61,000" subtitle="ROI +38.1%" accentColor="blue" icon={PiggyBank} />
          <MetricCard title="DeFi Yield APY" value="14.7%" subtitle="3 active pools - Aave + Curve" accentColor="purple" icon={Percent} />
          <MetricCard title="Gas Spent (30d)" value="$342" subtitle="Down -12% vs last month" accentColor="yellow" icon={Zap} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <PortfolioChart chartReady={chartReady} />
          </div>
          <div className="lg:col-span-2">
            <HoldingsTable />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NetworkStats />
          <RecentTransactions />
          <SmartAlerts />
        </div>
      </div>
    </>
  )
}

// ============ PORTFOLIO VIEW ============
function PortfolioView({ chartReady }: { chartReady: boolean }) {
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const stackedChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartInstanceRef = useRef<unknown>(null)
  const stackedChartInstanceRef = useRef<unknown>(null)

  const destroyCharts = useCallback(() => {
    if (pieChartInstanceRef.current) {
      (pieChartInstanceRef.current as { destroy: () => void }).destroy()
      pieChartInstanceRef.current = null
    }
    if (stackedChartInstanceRef.current) {
      (stackedChartInstanceRef.current as { destroy: () => void }).destroy()
      stackedChartInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartReady) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    destroyCharts()

    // Pie Chart
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d")
      if (ctx) {
        pieChartInstanceRef.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: portfolioChartData.labels,
            datasets: [{
              data: portfolioChartData.values,
              backgroundColor: portfolioChartData.colors,
              borderColor: "#0f1320",
              borderWidth: 3,
              hoverOffset: 10,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#141928",
                titleColor: "#9ca3af",
                bodyColor: "#e5e7eb",
                borderColor: "#1e2535",
                borderWidth: 1,
                padding: 12,
                callbacks: { label: (context: { label: string; parsed: number }) => `${context.label}: $${context.parsed.toLocaleString()}` },
              },
            },
          },
        })
      }
    }

    // Stacked Area Chart
    if (stackedChartRef.current) {
      const ctx = stackedChartRef.current.getContext("2d")
      if (ctx) {
        stackedChartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: allocationData.labels,
            datasets: [
              { label: "BTC", data: allocationData.btc, backgroundColor: "rgba(247, 147, 26, 0.8)", borderColor: "#f7931a", fill: true, tension: 0.4 },
              { label: "ETH", data: allocationData.eth, backgroundColor: "rgba(98, 126, 234, 0.8)", borderColor: "#627eea", fill: true, tension: 0.4 },
              { label: "SOL", data: allocationData.sol, backgroundColor: "rgba(0, 217, 164, 0.8)", borderColor: "#00d9a4", fill: true, tension: 0.4 },
              { label: "USDC", data: allocationData.usdc, backgroundColor: "rgba(39, 117, 202, 0.8)", borderColor: "#2775ca", fill: true, tension: 0.4 },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "bottom" as const, labels: { color: "#9ca3af", font: { size: 11 }, padding: 16, usePointStyle: true } },
              tooltip: { backgroundColor: "#141928", titleColor: "#9ca3af", bodyColor: "#e5e7eb", borderColor: "#1e2535", borderWidth: 1, mode: "index" as const },
            },
            scales: {
              x: { stacked: true, grid: { display: false }, ticks: { color: "#9ca3af" }, border: { display: false } },
              y: { stacked: true, max: 100, grid: { color: "#1e2535" }, ticks: { color: "#9ca3af", callback: (value: number) => `${value}%` }, border: { display: false } },
            },
            interaction: { intersect: false, mode: "index" as const },
          },
        })
      }
    }

    return destroyCharts
  }, [chartReady, destroyCharts])

  return (
    <>
      <TopBar title="Portfolio Details" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard title="Total Holdings" value="4 Assets" subtitle="Across 2 networks" accentColor="blue" />
          <MetricCard title="Best Performer" value="BTC +5.2%" subtitle="24h change" accentColor="green" />
          <MetricCard title="Worst Performer" value="SOL -1.8%" subtitle="24h change" accentColor="yellow" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocation Pie Chart */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Asset Allocation</h3>
            <div className="flex items-center gap-8">
              <div className="h-[200px] w-[200px] flex-shrink-0">
                <canvas ref={pieChartRef}></canvas>
              </div>
              <div className="flex-1 space-y-3">
                {portfolioChartData.labels.map((label, i) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: portfolioChartData.colors[i] }} />
                      <span className="text-sm text-foreground">{label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-foreground">${portfolioChartData.values[i].toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({((portfolioChartData.values[i] / portfolioChartData.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation Over Time */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Allocation Over Time</h3>
            <div className="h-[250px]">
              <canvas ref={stackedChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Full Holdings Table */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">All Holdings</h3>
          <div className="grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
            <span>Asset</span>
            <span>Amount</span>
            <span>Avg Buy Price</span>
            <span>Current Price</span>
            <span className="text-right">P&L</span>
            <span className="text-right">Value</span>
          </div>
          <div className="divide-y divide-border">
            {[
              { ...holdings[0], avgBuy: "$52,100", pl: "+$12,570", plPercent: 29.4 },
              { ...holdings[1], avgBuy: "$2,890", pl: "+$5,405", plPercent: 34.6 },
              { ...holdings[2], avgBuy: "$142", pl: "+$1,368", plPercent: 25.4 },
              { ...holdings[3], avgBuy: "$1.00", pl: "$0", plPercent: 0 },
            ].map((h) => (
              <div key={h.symbol} className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ backgroundColor: h.color }}>
                    {h.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.symbol}</p>
                    <p className="text-xs text-muted-foreground">{h.name}</p>
                  </div>
                </div>
                <p className="text-sm font-mono text-foreground">{h.amount}</p>
                <p className="text-sm font-mono text-muted-foreground">{h.avgBuy}</p>
                <p className="text-sm font-mono text-foreground">{h.price}</p>
                <div className="text-right">
                  <p className={cn("text-sm font-mono", h.plPercent > 0 ? "text-success" : "text-muted-foreground")}>{h.pl}</p>
                  <p className={cn("text-xs", h.plPercent > 0 ? "text-success" : "text-muted-foreground")}>
                    {h.plPercent > 0 ? "+" : ""}{h.plPercent}%
                  </p>
                </div>
                <p className="text-sm font-mono font-medium text-foreground text-right">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ============ DEFI & YIELD VIEW ============
function DeFiYieldView({ chartReady }: { chartReady: boolean }) {
  const yieldChartRef = useRef<HTMLCanvasElement>(null)
  const yieldChartInstanceRef = useRef<unknown>(null)

  const destroyChart = useCallback(() => {
    if (yieldChartInstanceRef.current) {
      (yieldChartInstanceRef.current as { destroy: () => void }).destroy()
      yieldChartInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartReady || !yieldChartRef.current) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    destroyChart()

    const ctx = yieldChartRef.current.getContext("2d")
    if (!ctx) return

    yieldChartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthlyYieldData.labels,
        datasets: [{
          label: "Yield Earned",
          data: monthlyYieldData.values,
          backgroundColor: "#a855f7",
          borderColor: "#a855f7",
          borderWidth: 0,
          borderRadius: 6,
          barThickness: 32,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#141928",
            titleColor: "#9ca3af",
            bodyColor: "#e5e7eb",
            borderColor: "#1e2535",
            borderWidth: 1,
            padding: 12,
            callbacks: { label: (context: { parsed: { y: number } }) => `$${context.parsed.y.toLocaleString()}` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "#1e2535" },
            ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 }, callback: (value: number) => `$${value}` },
            border: { display: false },
          },
        },
      },
    })

    return destroyChart
  }, [chartReady, destroyChart])

  const totalEarned = defiPools.reduce((sum, pool) => sum + parseFloat(pool.earned.replace("$", "").replace(",", "")), 0)
  const avgApy = (defiPools.reduce((sum, pool) => sum + pool.apy, 0) / defiPools.length).toFixed(1)

  return (
    <>
      <TopBar title="DeFi & Yield" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard title="Active Pools" value="3 Pools" subtitle="Across 3 protocols" accentColor="purple" />
          <MetricCard title="Total Deposited" value="$26,300" subtitle="In DeFi protocols" accentColor="blue" />
          <MetricCard title="Total Earned" value={`$${totalEarned.toLocaleString()}`} subtitle="Lifetime yield" accentColor="green" />
          <MetricCard title="Avg APY" value={`${avgApy}%`} subtitle="Weighted average" accentColor="yellow" />
        </div>

        {/* Pool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {defiPools.map((pool) => (
            <div key={pool.name} className="bg-card border border-border rounded-lg p-5 hover:border-muted transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: pool.color }}>
                  {pool.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{pool.name}</p>
                  <p className="text-xs text-muted-foreground">{pool.protocol}</p>
                </div>
                <div className="ml-auto px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                  {pool.apy}% APY
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Deposited</span>
                  <span className="text-sm font-mono text-foreground">{pool.deposited}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">TVL</span>
                  <span className="text-sm font-mono text-muted-foreground">{pool.tvl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Earned</span>
                  <span className="text-sm font-mono text-success">{pool.earned}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Claim Rewards
              </button>
            </div>
          ))}
        </div>

        {/* Charts and Claims Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Monthly Yield Chart */}
          <div className="lg:col-span-3 bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Monthly Yield Earned</h3>
            <div className="h-[280px]">
              <canvas ref={yieldChartRef}></canvas>
            </div>
          </div>

          {/* Claims History */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Claims History</h3>
            <div className="space-y-3">
              {claimsHistory.map((claim) => (
                <div key={claim.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Gift className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{claim.pool}</p>
                    <p className="text-xs text-muted-foreground">{claim.date}</p>
                  </div>
                  <p className="text-sm font-mono font-medium text-success">{claim.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ============ NFT TRACKER VIEW ============
function NFTTrackerView({ chartReady }: { chartReady: boolean }) {
  const floorChartRef = useRef<HTMLCanvasElement>(null)
  const floorChartInstanceRef = useRef<unknown>(null)

  const destroyChart = useCallback(() => {
    if (floorChartInstanceRef.current) {
      (floorChartInstanceRef.current as { destroy: () => void }).destroy()
      floorChartInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartReady || !floorChartRef.current) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    destroyChart()

    const ctx = floorChartRef.current.getContext("2d")
    if (!ctx) return

    floorChartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: floorPriceData.labels,
        datasets: [
          {
            label: "BAYC",
            data: floorPriceData.bayc,
            borderColor: "#8B5CF6",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#8B5CF6",
          },
          {
            label: "CryptoPunks",
            data: floorPriceData.punks,
            borderColor: "#EC4899",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#EC4899",
          },
          {
            label: "Azuki",
            data: floorPriceData.azuki,
            borderColor: "#EF4444",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#EF4444",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom" as const, labels: { color: "#9ca3af", font: { size: 11 }, padding: 16, usePointStyle: true } },
          tooltip: {
            backgroundColor: "#141928",
            titleColor: "#9ca3af",
            bodyColor: "#e5e7eb",
            borderColor: "#1e2535",
            borderWidth: 1,
            padding: 12,
            callbacks: { label: (context: { dataset: { label: string }; parsed: { y: number } }) => `${context.dataset.label}: ${context.parsed.y} ETH` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "#1e2535" },
            ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 }, callback: (value: number) => `${value} ETH` },
            border: { display: false },
          },
        },
        interaction: { intersect: false, mode: "index" as const },
      },
    })

    return destroyChart
  }, [chartReady, destroyChart])

  const totalFloorValue = nfts.reduce((sum, nft) => sum + nft.floor, 0)
  const totalBoughtValue = nfts.reduce((sum, nft) => sum + nft.bought, 0)
  const totalPL = totalFloorValue - totalBoughtValue

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-warning/10 text-warning"
      case "Epic": return "bg-accent/10 text-accent"
      case "Rare": return "bg-primary/10 text-primary"
      case "Uncommon": return "bg-success/10 text-success"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <>
      <TopBar title="NFT Tracker" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard title="Total NFTs" value={`${nfts.length} Items`} subtitle="Across 7 collections" accentColor="purple" />
          <MetricCard title="Floor Value" value={`${totalFloorValue.toFixed(1)} ETH`} subtitle={`≈ $${(totalFloorValue * 3891).toLocaleString()}`} accentColor="blue" />
          <MetricCard title="Total Invested" value={`${totalBoughtValue.toFixed(1)} ETH`} subtitle="Purchase price" accentColor="yellow" />
          <MetricCard 
            title="Unrealized P&L" 
            value={`${totalPL >= 0 ? "+" : ""}${totalPL.toFixed(1)} ETH`} 
            subtitle={`${((totalPL / totalBoughtValue) * 100).toFixed(1)}% ${totalPL >= 0 ? "profit" : "loss"}`} 
            accentColor={totalPL >= 0 ? "green" : "yellow"} 
          />
        </div>

        {/* NFT Grid */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Your NFTs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {nfts.map((nft) => {
              const pl = nft.floor - nft.bought
              const plPercent = ((pl / nft.bought) * 100).toFixed(1)
              return (
                <div key={nft.id} className="bg-secondary rounded-lg p-3 hover:bg-muted transition-colors cursor-pointer group">
                  {/* NFT Image Placeholder */}
                  <div 
                    className="aspect-square rounded-lg mb-3 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: nft.image }}
                  >
                    {nft.name.split("#")[0].trim().charAt(0)}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-foreground truncate">{nft.name}</p>
                      <p className="text-[10px] text-muted-foreground">{nft.collection}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Floor</span>
                      <span className="text-xs font-mono text-foreground">{nft.floor} ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">P&L</span>
                      <span className={cn("text-xs font-mono", pl >= 0 ? "text-success" : "text-destructive")}>
                        {pl >= 0 ? "+" : ""}{plPercent}%
                      </span>
                    </div>
                    <span className={cn("inline-block text-[10px] font-medium px-2 py-0.5 rounded-full", getRarityColor(nft.rarity))}>
                      {nft.rarity}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Floor Price Chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Floor Price Trends</h3>
          <div className="h-[280px]">
            <canvas ref={floorChartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  )
}

// ============ GAS TRACKER VIEW ============
function GasTrackerView({ chartReady }: { chartReady: boolean }) {
  const gasChartRef = useRef<HTMLCanvasElement>(null)
  const gasChartInstanceRef = useRef<unknown>(null)

  const destroyChart = useCallback(() => {
    if (gasChartInstanceRef.current) {
      (gasChartInstanceRef.current as { destroy: () => void }).destroy()
      gasChartInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartReady || !gasChartRef.current) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    destroyChart()

    const ctx = gasChartRef.current.getContext("2d")
    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, 0, 250)
    gradient.addColorStop(0, "rgba(79, 142, 247, 0.3)")
    gradient.addColorStop(1, "rgba(79, 142, 247, 0)")

    gasChartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: gas24hData.labels,
        datasets: [{
          label: "Gas Price (Gwei)",
          data: gas24hData.values,
          borderColor: "#4f8ef7",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#4f8ef7",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#141928",
            titleColor: "#9ca3af",
            bodyColor: "#e5e7eb",
            borderColor: "#1e2535",
            borderWidth: 1,
            padding: 12,
            callbacks: { label: (context: { parsed: { y: number } }) => `${context.parsed.y} Gwei` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "#1e2535" },
            ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 }, callback: (value: number) => `${value}` },
            border: { display: false },
          },
        },
        interaction: { intersect: false, mode: "index" as const },
      },
    })

    return destroyChart
  }, [chartReady, destroyChart])

  const gasCards = [
    { label: "Slow", ...gasData.slow, color: "yellow", icon: Clock },
    { label: "Standard", ...gasData.standard, color: "blue", icon: Activity },
    { label: "Fast", ...gasData.fast, color: "green", icon: Fuel },
  ]

  return (
    <>
      <TopBar title="Gas Tracker" />
      <div className="p-6 space-y-6">
        {/* Gas Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gasCards.map((card) => (
            <div key={card.label} className={cn(
              "bg-card border border-border rounded-lg p-5 hover:border-muted transition-colors relative overflow-hidden",
              card.label === "Standard" && "ring-2 ring-primary"
            )}>
              {card.label === "Standard" && (
                <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Recommended
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  card.color === "yellow" ? "bg-warning/10 text-warning" :
                  card.color === "blue" ? "bg-primary/10 text-primary" :
                  "bg-success/10 text-success"
                )}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{card.label}</p>
                  <p className="text-xs text-muted-foreground">{card.time}</p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-mono font-semibold text-foreground">{card.gwei}</p>
                  <p className="text-xs text-muted-foreground">Gwei</p>
                </div>
                <p className="text-lg font-mono text-muted-foreground">{card.usd}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 24h Chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Gas Price (24h)</h3>
          <div className="h-[280px]">
            <canvas ref={gasChartRef}></canvas>
          </div>
        </div>

        {/* Estimated Costs Table */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Estimated Transaction Costs</h3>
          <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
            <span>Action</span>
            <span className="text-center">Slow</span>
            <span className="text-center">Standard</span>
            <span className="text-center">Fast</span>
          </div>
          <div className="divide-y divide-border">
            {gasCostEstimates.map((estimate) => (
              <div key={estimate.action} className="grid grid-cols-4 gap-4 py-4 items-center hover:bg-secondary/50 -mx-5 px-5 transition-colors">
                <span className="text-sm font-medium text-foreground">{estimate.action}</span>
                <span className="text-sm font-mono text-warning text-center">{estimate.slow}</span>
                <span className="text-sm font-mono text-primary text-center">{estimate.standard}</span>
                <span className="text-sm font-mono text-success text-center">{estimate.fast}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ============ WHALE ALERTS VIEW ============
function WhaleAlertsView() {
  const [tokenFilter, setTokenFilter] = useState<string>("all")
  
  const filteredAlerts = tokenFilter === "all" 
    ? whaleAlerts 
    : whaleAlerts.filter(a => a.token === tokenFilter)

  const tokens = ["all", "BTC", "ETH", "SOL", "USDT", "USDC"]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exchange": return "bg-destructive/10 text-destructive"
      case "withdrawal": return "bg-success/10 text-success"
      case "mint": return "bg-accent/10 text-accent"
      default: return "bg-primary/10 text-primary"
    }
  }

  const getTokenColor = (token: string) => {
    switch (token) {
      case "BTC": return "#f7931a"
      case "ETH": return "#627eea"
      case "SOL": return "#00d9a4"
      case "USDT": return "#26a17b"
      case "USDC": return "#2775ca"
      default: return "#9ca3af"
    }
  }

  const totalVolume = whaleAlerts.reduce((sum, a) => sum + parseFloat(a.value.replace("$", "").replace("M", "")) * 1000000, 0)

  return (
    <>
      <TopBar title="Whale Alerts" />
      <div className="p-6 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard title="24h Whale Volume" value={`$${(totalVolume / 1e9).toFixed(2)}B`} subtitle="Large transactions tracked" accentColor="blue" />
          <MetricCard title="Active Whales" value="847" subtitle="Tracked addresses" accentColor="purple" />
          <MetricCard title="Exchange Inflow" value="+$124M" subtitle="Net inflow to exchanges" accentColor="yellow" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tokens.map((token) => (
            <button
              key={token}
              onClick={() => setTokenFilter(token)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                tokenFilter === token
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {token === "all" ? "All Tokens" : token}
            </button>
          ))}
        </div>

        {/* Alerts Feed */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Whale Movements</h3>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                  style={{ backgroundColor: getTokenColor(alert.token) }}
                >
                  {alert.token.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{alert.amount}</p>
                    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", getTypeColor(alert.type))}>
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {alert.from} → {alert.to}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-mono font-medium text-foreground">{alert.value}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ============ ALERTS VIEW ============
function AlertsView() {
  const [alerts, setAlerts] = useState(userAlerts)
  const [showForm, setShowForm] = useState(false)

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "price": return TrendingUp
      case "gas": return Fuel
      case "whale": return AlertTriangle
      case "portfolio": return Wallet
      case "defi": return Coins
      default: return Bell
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "price": return "bg-success/10 text-success"
      case "gas": return "bg-primary/10 text-primary"
      case "whale": return "bg-warning/10 text-warning"
      case "portfolio": return "bg-accent/10 text-accent"
      case "defi": return "bg-primary/10 text-primary"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <>
      <TopBar title="Alerts" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard title="Active Alerts" value={`${alerts.filter(a => a.enabled).length}`} subtitle="Currently monitoring" accentColor="green" />
          <MetricCard title="Triggered Today" value="3" subtitle="Alerts fired" accentColor="blue" />
          <MetricCard title="Total Alerts" value={`${alerts.length}`} subtitle="Configured" accentColor="purple" />
          <MetricCard title="Response Time" value="< 1s" subtitle="Average notification" accentColor="yellow" />
        </div>

        {/* Alerts List */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Your Alerts</h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              + New Alert
            </button>
          </div>

          {showForm && (
            <div className="mb-4 p-4 bg-secondary rounded-lg border border-border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Alert Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., BTC Price Alert" 
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Type</label>
                  <select className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Price Alert</option>
                    <option>Gas Alert</option>
                    <option>Whale Alert</option>
                    <option>Portfolio Alert</option>
                    <option>DeFi Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Condition</label>
                  <input 
                    type="text" 
                    placeholder="e.g., BTC > $70,000" 
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Create Alert
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = getTypeIcon(alert.type)
              return (
                <div key={alert.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", getTypeColor(alert.type))}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.name}</p>
                    <p className="text-xs text-muted-foreground">{alert.condition}</p>
                  </div>
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors flex-shrink-0",
                      alert.enabled ? "bg-success" : "bg-muted"
                    )}
                  >
                    <span className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      alert.enabled ? "translate-x-7" : "translate-x-1"
                    )} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alert History */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Alert History</h3>
          <div className="space-y-3">
            {alertHistory.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  alert.status === "triggered" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                )}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alert.name}</p>
                  <p className="text-xs text-muted-foreground">{alert.triggered}</p>
                </div>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0",
                  alert.status === "triggered" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                )}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ============ ON-CHAIN DATA VIEW ============
function OnChainDataView({ chartReady }: { chartReady: boolean }) {
  const activityChartRef = useRef<HTMLCanvasElement>(null)
  const activityChartInstanceRef = useRef<unknown>(null)

  const destroyChart = useCallback(() => {
    if (activityChartInstanceRef.current) {
      (activityChartInstanceRef.current as { destroy: () => void }).destroy()
      activityChartInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartReady || !activityChartRef.current) return

    const Chart = (window as unknown as { Chart: unknown }).Chart as unknown as {
      new (ctx: CanvasRenderingContext2D, config: unknown): { destroy: () => void }
    }
    if (!Chart) return

    destroyChart()

    const ctx = activityChartRef.current.getContext("2d")
    if (!ctx) return

    activityChartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthlyActivityData.labels,
        datasets: [
          {
            label: "Transactions",
            data: monthlyActivityData.transactions,
            backgroundColor: "#4f8ef7",
            borderRadius: 4,
            barPercentage: 0.6,
          },
          {
            label: "Contract Calls",
            data: monthlyActivityData.contracts,
            backgroundColor: "#a855f7",
            borderRadius: 4,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom" as const, labels: { color: "#9ca3af", font: { size: 11 }, padding: 16, usePointStyle: true } },
          tooltip: {
            backgroundColor: "#141928",
            titleColor: "#9ca3af",
            bodyColor: "#e5e7eb",
            borderColor: "#1e2535",
            borderWidth: 1,
            padding: 12,
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "#1e2535" },
            ticks: { color: "#9ca3af", font: { family: "IBM Plex Mono", size: 11 } },
            border: { display: false },
          },
        },
      },
    })

    return destroyChart
  }, [chartReady, destroyChart])

  const getHeatmapColor = (value: number) => {
    const colors = [
      "bg-[#161b26]",
      "bg-[#0e4429]",
      "bg-[#006d32]",
      "bg-[#26a641]",
      "bg-[#39d353]",
    ]
    return colors[value] || colors[0]
  }

  const totalTxns = monthlyActivityData.transactions.reduce((a, b) => a + b, 0)
  const totalContracts = topContracts.length

  return (
    <>
      <TopBar title="On-Chain Data" />
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard title="Total Transactions" value={totalTxns.toString()} subtitle="Last 12 months" accentColor="blue" />
          <MetricCard title="Active Days" value="247" subtitle="Out of 365" accentColor="green" />
          <MetricCard title="Contracts Used" value={totalContracts.toString()} subtitle="Unique contracts" accentColor="purple" />
          <MetricCard title="Chain Activity" value="High" subtitle="Top 15% of users" accentColor="yellow" />
        </div>

        {/* Activity Heatmap */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Transaction Activity (Last Year)</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[800px]">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={cn("w-[11px] h-[11px] rounded-[2px]", getHeatmapColor(day))}
                      title={`${day} transactions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={cn("w-[11px] h-[11px] rounded-[2px]", getHeatmapColor(level))} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Monthly Activity Chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Monthly Activity</h3>
          <div className="h-[280px]">
            <canvas ref={activityChartRef}></canvas>
          </div>
        </div>

        {/* Top Contracts Table */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Contracts Interacted</h3>
          <div className="grid grid-cols-5 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
            <span>Contract</span>
            <span>Address</span>
            <span className="text-center">Interactions</span>
            <span className="text-right">Volume</span>
            <span className="text-right">Last Used</span>
          </div>
          <div className="divide-y divide-border">
            {topContracts.map((contract) => (
              <div key={contract.id} className="grid grid-cols-5 gap-4 py-4 items-center hover:bg-secondary/50 -mx-5 px-5 transition-colors">
                <span className="text-sm font-medium text-foreground">{contract.name}</span>
                <span className="text-sm font-mono text-muted-foreground">{contract.address}</span>
                <span className="text-sm font-mono text-primary text-center">{contract.interactions}</span>
                <span className="text-sm font-mono text-foreground text-right">{contract.volume}</span>
                <span className="text-xs text-muted-foreground text-right">{contract.lastUsed}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ============ SETTINGS VIEW ============
function SettingsView() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [currency, setCurrency] = useState("USD")

  return (
    <>
      <TopBar title="Settings" />
      <div className="p-6 space-y-6 max-w-3xl">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">Profile</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">Anonymous Wallet</p>
                <p className="text-sm text-muted-foreground font-mono">0x3f4a...8d2c</p>
              </div>
              <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">Preferences</h3>
          </div>
          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Use dark theme across the app</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={cn("w-12 h-6 rounded-full transition-colors relative", darkMode ? "bg-primary" : "bg-muted")}
              >
                <span className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform", darkMode ? "left-7" : "left-1")} />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts for price movements</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={cn("w-12 h-6 rounded-full transition-colors relative", notifications ? "bg-primary" : "bg-muted")}
              >
                <span className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform", notifications ? "left-7" : "left-1")} />
              </button>
            </div>

            {/* Currency */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Display Currency</p>
                  <p className="text-xs text-muted-foreground">Choose your preferred currency</p>
                </div>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Session Timeout</p>
                <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
              </div>
              <select className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </>
  )
}

// ============ VIEW WRAPPER WITH FADE TRANSITION ============
function ViewWrapper({ children, viewKey }: { children: React.ReactNode; viewKey: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    setIsVisible(false)
    setShouldRender(false)
    const hideTimer = setTimeout(() => {
      setShouldRender(true)
      const showTimer = setTimeout(() => setIsVisible(true), 30)
      return () => clearTimeout(showTimer)
    }, 150)
    return () => clearTimeout(hideTimer)
  }, [viewKey])

  if (!shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {children}
    </div>
  )
}

// ============ MAIN DASHBOARD COMPONENT ============
export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewType>("Overview")
  const [chartReady, setChartReady] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Chart.js CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
        onLoad={() => setChartReady(true)}
        strategy="afterInteractive"
      />

      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <main className="ml-[220px] min-h-screen flex flex-col">
        <div className="flex-1">
          <ViewWrapper viewKey={activeView}>
            {activeView === "Overview" && <OverviewView chartReady={chartReady} />}
            {activeView === "Portfolio" && <PortfolioView chartReady={chartReady} />}
            {activeView === "DeFi & Yield" && <DeFiYieldView chartReady={chartReady} />}
            {activeView === "NFT Tracker" && <NFTTrackerView chartReady={chartReady} />}
            {activeView === "On-Chain Data" && <OnChainDataView chartReady={chartReady} />}
            {activeView === "Gas Tracker" && <GasTrackerView chartReady={chartReady} />}
            {activeView === "Whale Alerts" && <WhaleAlertsView />}
            {activeView === "Alerts" && <AlertsView />}
            {activeView === "Settings" && <SettingsView />}
          </ViewWrapper>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-border bg-card/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground">
                ChainView Pro v1.0.0
              </p>
              <span className="text-muted-foreground/30">|</span>
              <p className="text-xs text-muted-foreground">
                Data refreshed in real-time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                Crafted with precision by
              </p>
              <p className="text-xs font-semibold gradient-text">
                Ronald Cubides
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
