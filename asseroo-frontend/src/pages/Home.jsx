import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react"
import {
  IconArrowRight,
  IconLock,
  IconSend,
  IconLayoutDashboard,
  IconDatabase,
} from "@tabler/icons-react"

const features = [
  {
    icon: IconLock,
    title: "Aadhaar Identity Login",
    description: "12-digit Aadhaar is the user identity for onboarding and authentication.",
  },
  {
    icon: IconDatabase,
    title: "Vehicle Registration",
    description: "Register Indian vehicle numbers directly to the current owner Aadhaar.",
  },
  {
    icon: IconSend,
    title: "On-Chain Transfer",
    description: "Transfer ownership from one Aadhaar to another with blockchain records.",
  },
  {
    icon: IconLayoutDashboard,
    title: "Live Dashboard",
    description: "Inspect vehicle ownership, recent transactions, and chain validity.",
  },
]

const stats = [
  { label: "Identity Type", value: "Aadhaar" },
  { label: "Asset Type", value: "Vehicles" },
  { label: "Process", value: "Register → Transfer" },
]

function HomePage({ onNavigate }) {
  return (
    <div className="space-y-16 py-12">
      <section className="space-y-8">
        <div className="space-y-4">
          <div className="inline-block">
            <span className="badge-pastel-green">✨ Blockchain Ownership</span>
          </div>
          <h1 className="section-title text-5xl md:text-6xl leading-tight">
            Move Anything <span className="text-softBlue-500">On-Chain</span>
          </h1>
          <p className="section-subtitle text-xl max-w-2xl">
            Register a vehicle. Transfer it in seconds. Track the full ledger with zero clutter.
            Powered by Aadhaar identity and blockchain technology.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button
            className="button-pastel-primary text-lg h-12 px-8"
            endContent={<IconArrowRight size={20} />}
            onClick={() => onNavigate("login")}
          >
            Start with Aadhaar
          </Button>
          <Button
            className="button-pastel-secondary text-lg h-12 px-8"
            endContent={<IconSend size={20} />}
            onClick={() => onNavigate("transfer")}
          >
            Transfer Now
          </Button>
        </div>
      </section>

      <Divider className="my-8" />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-pastel">
            <CardBody className="gap-2">
              <p className="text-muted text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-softBlue-600">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="section-title text-4xl mb-2">How It Works</h2>
          <p className="section-subtitle">Everything you need in one elegant platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="card-pastel hover:shadow-pastel-lg">
                <CardHeader className="flex gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-softBlue-200 to-softBlue-100">
                    <Icon className="text-softBlue-600" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-700">{feature.title}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-muted">{feature.description}</p>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="card-pastel mt-16 p-12 text-center space-y-6">
        <h2 className="section-title text-3xl">Ready to Get Started?</h2>
        <p className="section-subtitle text-lg max-w-2xl mx-auto">
          Experience the future of vehicle ownership management with blockchain-backed security
          and Aadhaar verification.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button className="button-pastel-primary text-lg h-12 px-8" onClick={() => onNavigate("login")}>
            Begin Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
