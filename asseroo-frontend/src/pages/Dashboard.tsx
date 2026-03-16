import {
  ArrowUpRight,
  Clock3,
  Filter,
  Layers3,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const stats = [
  { label: "Total assets", value: "128", change: "+12%", icon: Layers3 },
  { label: "Wallets tracked", value: "09", change: "+2 this week", icon: Wallet },
  { label: "Pending transfers", value: "04", change: "2 need approval", icon: Clock3 },
  { label: "Security score", value: "98%", change: "Excellent", icon: ShieldCheck },
]

const holdings = [
  { name: "Carbon Credit Batch A", ticker: "CCA-2026", units: "42 units", owner: "Treasury wallet", status: "Stable" },
  { name: "Tokenized Inventory", ticker: "INV-884", units: "18 assets", owner: "Operations wallet", status: "Auditing" },
  { name: "Warranty Certificates", ticker: "WRC-119", units: "56 NFTs", owner: "Support wallet", status: "Active" },
  { name: "Logistics Escrow", ticker: "LGE-390", units: "12 positions", owner: "Custody wallet", status: "Review" },
]

const activities = [
  { title: "Transferred 5 Carbon Credits", meta: "To WLT-3A9F • 14 minutes ago", amount: "-5 CCA" },
  { title: "Received inventory token bundle", meta: "From Ops reserve • 2 hours ago", amount: "+3 INV" },
  { title: "Updated wallet permissions", meta: "Admin console • Yesterday", amount: "Policy" },
]

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-gradient-to-br from-card/92 via-card/85 to-secondary/35 p-6 shadow-sm shadow-primary/10 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge>Portfolio overview</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Asset dashboard</h1>
          <p className="max-w-2xl text-muted-foreground">
            Review tokenized assets, wallet health, and recent movements from a
            single operator-friendly workspace.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-[260px]">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search assets or wallets" className="pl-9" />
          </div>
          <Button variant="outline" size="lg">
            <Filter className="size-4" />
            Filter view
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label} className="border-border/70 bg-card/82">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </div>
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-primary/85">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/70 bg-card/82">
          <CardHeader>
            <CardTitle>Your assets</CardTitle>
            <CardDescription>
              Snapshot of current holdings across managed wallets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {holdings.map((asset) => (
              <div
                key={asset.ticker}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background/65 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{asset.name}</h3>
                    <Badge variant="outline">{asset.ticker}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {asset.owner} • {asset.units}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={asset.status === "Stable" ? "default" : "secondary"}>
                    {asset.status}
                  </Badge>
                  <Button type="button" variant="ghost">
                    View
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/82">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Latest actions recorded in the UI preview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.title} className="rounded-2xl border border-border/70 bg-background/65 p-4 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{activity.meta}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{activity.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
