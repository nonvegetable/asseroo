import { useState } from "react"
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@heroui/react"
import { IconSend, IconCar, IconShieldCheck, IconArrowsLeftRight } from "@tabler/icons-react"
import { apiClient, parseApiError } from "@/lib/api"

const transferModes = [
  {
    label: "Standard Settlement",
    value: "Standard settlement",
    icon: IconCar,
    description: "Balanced confirmation and throughput",
  },
  {
    label: "High Assurance",
    value: "High assurance",
    icon: IconShieldCheck,
    description: "Extra validation checks for critical transfers",
  },
  {
    label: "Regulatory Fast Track",
    value: "Regulatory fast track",
    icon: IconArrowsLeftRight,
    description: "Prioritized write path for service counters",
  },
]

export default function TransferFormPage({ currentUserAadhaar, onDataChanged }) {
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState("")
  const [transferVehicleNumber, setTransferVehicleNumber] = useState("")
  const [recipientAadhaarNumber, setRecipientAadhaarNumber] = useState("")
  const [transferMode, setTransferMode] = useState("Standard settlement")
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusType, setStatusType] = useState("error")
  const [busyAction, setBusyAction] = useState(null)

  const normalizeVehicle = (value) => value.toUpperCase().replace(/[^A-Z0-9-\s]/g, "")
  const normalizeAadhaar = (value) => value.replace(/\D/g, "").slice(0, 12)

  const handleRegisterVehicle = async () => {
    if (!currentUserAadhaar) {
      setStatusMessage("Please login before registering vehicles.")
      setStatusType("error")
      return
    }

    if (!vehicleRegistrationNumber.trim()) {
      setStatusMessage("Enter a vehicle registration number.")
      setStatusType("error")
      return
    }

    setBusyAction("register")
    setStatusMessage(null)

    try {
      await apiClient.registerVehicle(vehicleRegistrationNumber, currentUserAadhaar)
      setVehicleRegistrationNumber("")
      setStatusMessage("Vehicle registered on blockchain successfully!")
      setStatusType("success")
      await onDataChanged()
    } catch (error) {
      setStatusMessage(parseApiError(error))
      setStatusType("error")
    } finally {
      setBusyAction(null)
    }
  }

  const handleTransferVehicle = async () => {
    if (!currentUserAadhaar) {
      setStatusMessage("Please login before transferring vehicles.")
      setStatusType("error")
      return
    }

    if (!transferVehicleNumber.trim()) {
      setStatusMessage("Enter a vehicle registration number to transfer.")
      setStatusType("error")
      return
    }

    if (recipientAadhaarNumber.length !== 12) {
      setStatusMessage("Recipient Aadhaar must be exactly 12 digits.")
      setStatusType("error")
      return
    }

    setBusyAction("transfer")
    setStatusMessage(null)

    try {
      await apiClient.transferVehicle(transferVehicleNumber, currentUserAadhaar, recipientAadhaarNumber)
      setTransferVehicleNumber("")
      setRecipientAadhaarNumber("")
      setStatusMessage("Vehicle transferred successfully on blockchain!")
      setStatusType("success")
      await onDataChanged()
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
          <span className="badge-pastel-pink">📤 Quick Transfer</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl leading-tight">
          Register & Transfer <span className="text-softPink-500">Vehicles</span>
        </h1>
        <p className="section-subtitle text-xl max-w-2xl">
          Register your vehicle asset to the blockchain, then transfer ownership instantly to another Aadhaar holder.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-pastel">
            <CardHeader className="flex gap-3 pb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-softPink-200 to-softPink-100">
                <IconCar className="text-softPink-600" size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-700">Register Vehicle</h2>
                <p className="text-muted text-sm">Add a vehicle to blockchain as your asset</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4 p-6">
              <div className="space-y-2">
                <label className="label-pastel">Vehicle Registration Number</label>
                <Input
                  placeholder="KA01AB1234"
                  value={vehicleRegistrationNumber}
                  onChange={(e) => setVehicleRegistrationNumber(normalizeVehicle(e.target.value))}
                  classNames={{
                    input: "input-pastel",
                    inputWrapper: "bg-white/50",
                  }}
                  description="e.g., KA01AB1234 or MH12DE3434"
                />
              </div>

              <div className="space-y-2">
                <label className="label-pastel">Your Aadhaar</label>
                <Input
                  disabled
                  value={currentUserAadhaar || "Not logged in"}
                  classNames={{
                    input: "input-pastel opacity-60",
                    inputWrapper: "bg-white/30",
                  }}
                />
              </div>

              <Button
                className="button-pastel-primary text-base h-11 w-full"
                isLoading={busyAction === "register"}
                disabled={!currentUserAadhaar || busyAction !== null || !vehicleRegistrationNumber.trim()}
                onClick={handleRegisterVehicle}
              >
                {busyAction === "register" ? "Registering..." : "Register Vehicle"}
              </Button>
            </CardBody>
          </Card>

          <Card className="card-pastel">
            <CardHeader className="flex gap-3 pb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-softPurple-200 to-softPurple-100">
                <IconSend className="text-softPurple-600" size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-700">Transfer Vehicle</h2>
                <p className="text-muted text-sm">Move ownership to another Aadhaar holder</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label-pastel">From Aadhaar</label>
                  <Input
                    disabled
                    value={currentUserAadhaar || "Not logged in"}
                    classNames={{
                      input: "input-pastel opacity-60",
                      inputWrapper: "bg-white/30",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-pastel">To Aadhaar</label>
                  <Input
                    inputMode="numeric"
                    placeholder="123412341234"
                    value={recipientAadhaarNumber}
                    onChange={(e) => setRecipientAadhaarNumber(normalizeAadhaar(e.target.value))}
                    maxLength={12}
                    classNames={{
                      input: "input-pastel",
                      inputWrapper: "bg-white/50",
                    }}
                    description="12 digits"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label-pastel">Vehicle Registration</label>
                  <Input
                    placeholder="MH12DE3434"
                    value={transferVehicleNumber}
                    onChange={(e) => setTransferVehicleNumber(normalizeVehicle(e.target.value))}
                    classNames={{
                      input: "input-pastel",
                      inputWrapper: "bg-white/50",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-pastel">Transfer Mode</label>
                  <Select
                    selectedKeys={[transferMode]}
                    onChange={(e) => setTransferMode(e.target.value)}
                    classNames={{
                      trigger: "input-pastel",
                      popoverContent: "bg-white/95",
                    }}
                  >
                    {transferModes.map((mode) => (
                      <SelectItem key={mode.value}>{mode.label}</SelectItem>
                    ))}
                  </Select>
                </div>
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

              <Button
                className="button-pastel-secondary text-base h-11 w-full"
                isLoading={busyAction === "transfer"}
                disabled={
                  !currentUserAadhaar ||
                  busyAction !== null ||
                  !transferVehicleNumber.trim() ||
                  recipientAadhaarNumber.length !== 12
                }
                onClick={handleTransferVehicle}
              >
                {busyAction === "transfer" ? "Transferring..." : "Transfer Vehicle"}
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="card-pastel">
            <CardHeader className="pb-3">
              <h3 className="text-xl font-bold text-gray-700">Transfer Preview</h3>
            </CardHeader>
            <Divider />
            <CardBody className="gap-3 p-6">
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-softPink-50 border border-softPink-200">
                  <p className="text-xs text-muted uppercase">Selected Vehicle</p>
                  <p className="text-lg font-semibold text-gray-700 mt-1">{transferVehicleNumber || "—"}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-softBlue-50 border border-softBlue-200">
                    <p className="text-xs text-muted uppercase">From</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
                      {currentUserAadhaar || "—"}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-softGreen-50 border border-softGreen-200">
                    <p className="text-xs text-muted uppercase">To</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
                      {recipientAadhaarNumber || "—"}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-softPurple-50 border border-softPurple-200">
                  <p className="text-xs text-muted uppercase">Mode</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">{transferMode}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-lg">Transfer Options</h3>
            {transferModes.map((mode) => {
              const Icon = mode.icon
              return (
                <Card key={mode.value} className="card-pastel cursor-pointer hover:shadow-pastel-md" isPressable>
                  <CardBody className="gap-2 p-4">
                    <div className="flex gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-softPurple-200 to-softPurple-100 h-fit">
                        <Icon className="text-softPurple-600" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-700">{mode.label}</p>
                        <p className="text-xs text-muted">{mode.description}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
