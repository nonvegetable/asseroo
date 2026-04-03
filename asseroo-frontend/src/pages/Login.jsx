import { useState } from "react"
import { Card, CardBody, CardHeader, Divider, Input, Button } from "@heroui/react"
import { IconShieldCheck, IconFingerprint, IconId } from "@tabler/icons-react"
import { apiClient, parseApiError } from "@/lib/api"

const securityFeatures = [
  {
    icon: IconShieldCheck,
    title: "Identity Verified",
    description: "Only 12-digit Aadhaar users can access ownership actions.",
  },
  {
    icon: IconFingerprint,
    title: "Aadhaar-First Login",
    description: "No password flow. Aadhaar is your user identity.",
  },
  {
    icon: IconId,
    title: "Vehicle Ownership",
    description: "Vehicles are mapped to Aadhaar with blockchain entries.",
  },
]

export default function LoginPage({ onAuthenticated }) {
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [busyAction, setBusyAction] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusType, setStatusType] = useState("error")

  const normalizeAadhaar = (value) => value.replace(/\D/g, "").slice(0, 12)
  const isValidAadhaar = aadhaarNumber.length === 12

  const handleRegister = async () => {
    if (!isValidAadhaar) {
      setStatusMessage("Aadhaar number must contain exactly 12 digits.")
      setStatusType("error")
      return
    }

    setBusyAction("register")
    setStatusMessage(null)

    try {
      const result = await apiClient.registerAadhaar(aadhaarNumber)
      setStatusMessage(result.message)
      setStatusType("success")
    } catch (error) {
      setStatusMessage(parseApiError(error))
      setStatusType("error")
    } finally {
      setBusyAction(null)
    }
  }

  const handleLogin = async () => {
    if (!isValidAadhaar) {
      setStatusMessage("Aadhaar number must contain exactly 12 digits.")
      setStatusType("error")
      return
    }

    setBusyAction("login")
    setStatusMessage(null)

    try {
      const result = await apiClient.loginAadhaar(aadhaarNumber)

      if (!result.authenticated) {
        setStatusMessage(result.message ?? "Aadhaar not registered.")
        setStatusType("error")
        return
      }

      setStatusMessage("Login successful!")
      setStatusType("success")
      onAuthenticated(aadhaarNumber, result.vehicles ?? [])
    } catch (error) {
      setStatusMessage(parseApiError(error))
      setStatusType("error")
    } finally {
      setBusyAction(null)
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="inline-block">
          <span className="badge-pastel-blue">🔐 Secure Access</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl leading-tight">
          Login with <span className="text-softBlue-500">Aadhaar</span>
        </h1>
        <p className="section-subtitle text-xl max-w-2xl">
          Register once, then use the same Aadhaar number to access vehicle ownership actions.
          No password needed—blockchain-verified access.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {securityFeatures.map((feature) => {
          const Icon = feature.icon

          return (
            <Card key={feature.title} className="card-pastel">
              <CardBody className="gap-4">
                <div className="p-3 w-fit rounded-2xl bg-gradient-to-br from-softBlue-200 to-softBlue-100">
                  <Icon className="text-softBlue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">{feature.title}</h3>
                  <p className="text-muted text-sm">{feature.description}</p>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <Card className="card-pastel max-w-2xl mx-auto w-full">
        <CardHeader className="flex flex-col items-start px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-700">Aadhaar Login</h2>
          <p className="text-muted text-sm">Use your 12-digit Aadhaar for register & login</p>
        </CardHeader>
        <Divider />
        <CardBody className="gap-6 p-6">
          <div className="space-y-2">
            <label htmlFor="aadhaar" className="label-pastel">
              Aadhaar Number
            </label>
            <Input
              id="aadhaar"
              inputMode="numeric"
              placeholder="123412341234"
              value={aadhaarNumber}
              onChange={(event) => setAadhaarNumber(normalizeAadhaar(event.target.value))}
              maxLength={12}
              classNames={{
                input: "input-pastel",
                inputWrapper: "bg-white/50",
              }}
              description="Exactly 12 digits"
            />
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-2xl text-sm font-medium ${
                statusType === "success"
                  ? "badge-pastel-green bg-softGreen-50"
                  : "badge-pastel-pink bg-softPink-50"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              className="button-pastel-primary text-base h-11"
              isLoading={busyAction === "login"}
              disabled={busyAction !== null || !isValidAadhaar}
              onClick={handleLogin}
            >
              {busyAction === "login" ? "Signing In..." : "Login"}
            </Button>
            <Button
              className="button-pastel-tertiary text-base h-11"
              isLoading={busyAction === "register"}
              disabled={busyAction !== null || !isValidAadhaar}
              onClick={handleRegister}
            >
              {busyAction === "register" ? "Registering..." : "Register Aadhaar"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
