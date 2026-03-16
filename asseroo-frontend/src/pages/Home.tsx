import { useState } from "react"
import {
	ArrowRight,
	Blocks,
	LayoutDashboard,
	Lock,
	Moon,
	Send,
	Sun,
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
import { useTheme } from "@/components/theme-provider"
import DashboardPage from "./Dashboard"
import TransferFormPage from "./Form"
import LoginPage from "./Login"

type View = "home" | "login" | "transfer" | "dashboard"

const navigationItems: Array<{
	id: View
	label: string
	icon: typeof Blocks
}> = [
	{ id: "home", label: "Home", icon: Blocks },
	{ id: "login", label: "Login", icon: Lock },
	{ id: "transfer", label: "Transfer", icon: Send },
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
]

const highlights = [
	{
		title: "Asset-ready landing page",
		description: "Hero section, product stats, and quick actions for blockchain operators.",
	},
	{
		title: "Login experience",
		description: "Secure sign-in layout with 2FA, wallet ID, and SSO placeholders.",
	},
	{
		title: "Transfer flow",
		description: "Form states for sending tokenized assets across wallets and networks.",
	},
	{
		title: "Portfolio dashboard",
		description: "Cards and lists to inspect current holdings and recent asset movement.",
	},
]

const stats = [
	{ label: "Assets tracked", value: "128+" },
	{ label: "Managed wallets", value: "09" },
	{ label: "Transfer templates", value: "14" },
]

function LandingPage({ onNavigate }: { onNavigate: (view: View) => void }) {
	return (
		<section className="space-y-6">
			<Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/12 via-background to-secondary/35">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,170,228,0.18),transparent_40%)]" />
				<CardContent className="grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
					<div className="space-y-6">
						<Badge>Blockchain asset UI</Badge>
						<div className="space-y-4">
							<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
								Modern shadcn frontend for your asset transfer workflow
							</h1>
							<p className="max-w-2xl text-lg text-muted-foreground">
								A clean React interface for onboarding users, moving blockchain assets,
								and reviewing portfolio state. Everything is static UI, ready for later backend integration.
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button size="lg" onClick={() => onNavigate("login")}>
								Open login page
								<ArrowRight className="size-4" />
							</Button>
							<Button size="lg" variant="outline" onClick={() => onNavigate("dashboard")}>
								View dashboard
							</Button>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							{stats.map((stat) => (
								<div key={stat.label} className="rounded-2xl border border-border/70 bg-background/75 p-4 backdrop-blur-sm">
									<p className="text-sm text-muted-foreground">{stat.label}</p>
									<p className="mt-1 text-2xl font-semibold">{stat.value}</p>
								</div>
							))}
						</div>
					</div>

					<div className="grid gap-4">
						<Card className="border-primary/20 bg-background/72 backdrop-blur-md">
							<CardHeader>
								<CardTitle>Quick launch</CardTitle>
								<CardDescription>Preview the key screens available in this UI prototype.</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-3">
								<Button variant="outline" className="justify-between" onClick={() => onNavigate("login")}>
									Secure login
									<ArrowRight className="size-4" />
								</Button>
								<Button variant="outline" className="justify-between" onClick={() => onNavigate("transfer")}>
									Transfer asset form
									<ArrowRight className="size-4" />
								</Button>
								<Button variant="outline" className="justify-between" onClick={() => onNavigate("dashboard")}>
									Holdings dashboard
									<ArrowRight className="size-4" />
								</Button>
							</CardContent>
						</Card>

						<Card className="border-border/70 bg-card/75 backdrop-blur-sm">
							<CardHeader>
								<CardTitle>Why this layout works</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-sm text-muted-foreground">
								<p>• Consistent shadcn styling across cards, forms, actions, and status chips.</p>
								<p>• Clean structure for plugging in routes, auth, and blockchain data later.</p>
								<p>• Dashboard and transfer screens designed for operator workflows.</p>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{highlights.map((highlight) => (
					<Card key={highlight.title} className="border-border/70 bg-card/80">
						<CardHeader>
							<CardTitle className="text-base">{highlight.title}</CardTitle>
							<CardDescription>{highlight.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</section>
	)
}

export default function Home() {
	const [activeView, setActiveView] = useState<View>("home")
	const { theme, setTheme } = useTheme()

	return (
		<div className="min-h-screen bg-background/95">
			<div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
				<header className="sticky top-0 z-20 mb-8 rounded-3xl border border-border/70 bg-background/72 p-4 shadow-sm shadow-primary/10 backdrop-blur-md">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-2xl bg-primary/10 p-3 text-primary">
								<Blocks className="size-5" />
							</div>
							<div>
								<p className="text-lg font-semibold">Asseroo Chain UI</p>
								<p className="text-sm text-muted-foreground">
									Static frontend preview for blockchain assets
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<nav className="flex flex-wrap gap-2">
								{navigationItems.map((item) => {
									const Icon = item.icon

									return (
										<Button
											key={item.id}
											type="button"
											variant={activeView === item.id ? "default" : "outline"}
											onClick={() => setActiveView(item.id)}
										>
											<Icon className="size-4" />
											{item.label}
										</Button>
									)
								})}
							</nav>

							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								aria-label="Toggle theme"
							>
								{theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
							</Button>
						</div>
					</div>
				</header>

				<main className="flex-1 pb-8">
					{activeView === "home" && <LandingPage onNavigate={setActiveView} />}
					{activeView === "login" && <LoginPage />}
					{activeView === "transfer" && <TransferFormPage />}
					{activeView === "dashboard" && <DashboardPage />}
				</main>
			</div>
		</div>
	)
}
