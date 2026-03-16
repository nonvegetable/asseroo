import { Fingerprint, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Protected access",
    description: "Role-based access, audit-ready sessions, and wallet-level permissions.",
  },
  {
    icon: Fingerprint,
    title: "Device trust",
    description: "Recognize approved operator devices before allowing asset movement.",
  },
  {
    icon: KeyRound,
    title: "Recovery flow",
    description: "Built-in recovery states for key rotation and emergency access requests.",
  },
]

export default function LoginPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/12 via-background to-secondary/35">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,170,228,0.17),transparent_40%)]" />
        <CardHeader className="relative space-y-4">
          <Badge className="w-fit">Operator access</Badge>
          <CardTitle className="text-3xl sm:text-4xl">Secure sign-in for your blockchain console</CardTitle>
          <CardDescription className="max-w-xl text-base">
            A clean auth screen for administrators, custodians, and asset owners.
            No backend calls, just a polished interface ready for integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative grid gap-4 sm:grid-cols-3">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/70 bg-background/72 p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-1 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/86 shadow-lg shadow-primary/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Preview a sign-in form for wallet managers and internal operators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="operator@asseroo.app" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Enter your password" className="pl-9" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet ID</Label>
                <Input id="wallet" placeholder="WLT-07A2-9D1C" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">2FA Code</Label>
                <Input id="otp" inputMode="numeric" placeholder="000000" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/55 px-4 py-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="size-4 rounded border-border" defaultChecked />
                Keep this device trusted for 30 days
              </label>
              <button type="button" className="font-medium text-primary">
                Forgot password?
              </button>
            </div>

            <div className="space-y-3">
              <Button type="button" className="w-full" size="lg">
                Sign in securely
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outline" size="lg">
                  SSO access
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Connect wallet key
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t border-border/60 text-sm text-muted-foreground">
          Demo only. Authentication is intentionally disabled in this UI prototype.
        </CardFooter>
      </Card>
    </section>
  )
}
