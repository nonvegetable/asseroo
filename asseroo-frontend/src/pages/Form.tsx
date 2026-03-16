import { ArrowRightLeft, Clock3, ShieldCheck, Wallet } from "lucide-react"

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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ownedAssets = ["Carbon Credit Batch A", "Tokenized Inventory", "Warranty Certificate NFT"]
const priorities = [
  { label: "Standard settlement", note: "Finalizes in 2 to 5 minutes", icon: Clock3 },
  { label: "High assurance", note: "Adds an approval checkpoint", icon: ShieldCheck },
  { label: "Wallet to wallet", note: "Direct movement between managed accounts", icon: Wallet },
]

const selectStyles =
  "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"

export default function TransferFormPage() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-border/70 bg-card/84">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <ArrowRightLeft className="size-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Transfer asset</CardTitle>
              <CardDescription>
                Prepare a token transfer interface without backend wiring.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <select id="asset" className={selectStyles} defaultValue={ownedAssets[0]}>
                  {ownedAssets.map((asset) => (
                    <option key={asset} value={asset}>
                      {asset}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="network">Network</Label>
                <select id="network" className={selectStyles} defaultValue="Private Chain">
                  <option>Private Chain</option>
                  <option>Consortium Network</option>
                  <option>Sandbox Testnet</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="from-wallet">From wallet</Label>
                <Input id="from-wallet" placeholder="Treasury wallet" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-wallet">Recipient wallet</Label>
                <Input id="to-wallet" placeholder="WLT-3A9F-1C20" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[0.6fr_0.4fr]">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select id="priority" className={selectStyles} defaultValue="High assurance">
                  {priorities.map((priority) => (
                    <option key={priority.label}>{priority.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo">Memo or transfer note</Label>
              <Textarea
                id="memo"
                placeholder="Describe the transfer purpose, approvals, or invoice reference."
              />
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/55 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium">Gas budget</span>
                <span className="text-muted-foreground">2.5 credits</span>
              </div>
              <input type="range" defaultValue={55} className="w-full accent-primary" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Eco</span>
                <span>Balanced</span>
                <span>Priority</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" size="lg">
                Save draft
              </Button>
              <Button type="button" size="lg">
                Review transfer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="relative overflow-hidden border-border/70 bg-gradient-to-br from-primary/12 via-background to-secondary/35">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,170,228,0.16),transparent_40%)]" />
          <CardHeader>
            <Badge className="w-fit">Transfer preview</Badge>
            <CardTitle>Review panel</CardTitle>
            <CardDescription>
              A companion summary card that can later connect to real validation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-2xl border border-border/70 bg-background/72 p-4 backdrop-blur-sm">
              <p className="text-muted-foreground">Selected asset</p>
              <p className="mt-1 font-semibold">Carbon Credit Batch A</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/72 p-4 backdrop-blur-sm">
                <p className="text-muted-foreground">Transfer amount</p>
                <p className="mt-1 font-semibold">10 units</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/72 p-4 backdrop-blur-sm">
                <p className="text-muted-foreground">Settlement mode</p>
                <p className="mt-1 font-semibold">High assurance</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-primary">
              Recipient verification and blockchain fee calculation can be added later.
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/82">
          <CardHeader>
            <CardTitle>Transfer options</CardTitle>
            <CardDescription>Preset UI states for common asset movement flows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorities.map((priority) => {
              const Icon = priority.icon

              return (
                <div key={priority.label} className="rounded-2xl border border-border/70 bg-background/65 p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{priority.label}</p>
                      <p className="text-sm text-muted-foreground">{priority.note}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
