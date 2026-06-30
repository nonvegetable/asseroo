import { useEffect, useMemo, useState } from "react"
import { Button, Card, CardBody, CardHeader, Divider, Chip } from "@heroui/react"
import {
  IconCar,
  IconLayersIntersect,
  IconClock,
  IconShieldCheck,
  IconUser,
  IconLink,
  IconRefresh,
} from "@tabler/icons-react"

import { apiClient, parseApiError } from "@/lib/api"

export default function DashboardPage({ currentUserAadhaar, ownedVehicles }) {
  const [transactions, setTransactions] = useState([])
  const [chainValid, setChainValid] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const [transactionData, validity] = await Promise.all([
        apiClient.getTransactions(),
        apiClient.getChainValidity(),
      ])
      setTransactions(transactionData)
      setChainValid(validity.valid)
      setStatusMessage(null)
    } catch (error) {
      setStatusMessage(parseApiError(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadDashboard()
  }, [])

  const stats = useMemo(
    () => [
      {
        label: "My Vehicles",
        value: `${ownedVehicles.length}`,
        note: "Currently owned",
        icon: IconCar,
        color: "green",
      },
      {
        label: "On-Chain Transactions",
        value: `${transactions.length}`,
        note: "Total recorded",
        icon: IconLayersIntersect,
        color: "blue",
      },
      {
        label: "Recent Activity",
        value: `${transactions.slice(0, 5).length}`,
        note: "Latest updates",
        icon: IconClock,
        color: "purple",
      },
      {
        label: "Chain Status",
        value: chainValid ? "Valid" : chainValid === null ? "Checking" : "Invalid",
        note: "Hash linkage verified",
        icon: IconShieldCheck,
        color: chainValid ? "green" : chainValid === false ? "pink" : "blue",
      },
    ],
    [ownedVehicles.length, transactions, chainValid]
  )

  const getStatStyles = (color) => {
    switch (color) {
      case "green":
        return {
          iconBg: "bg-softGreen-100",
          iconText: "text-softGreen-600",
          valueText: "text-softGreen-600",
          noteClass: "badge-pastel-green",
        }
      case "blue":
        return {
          iconBg: "bg-softBlue-100",
          iconText: "text-softBlue-600",
          valueText: "text-softBlue-600",
          noteClass: "badge-pastel-blue",
        }
      case "purple":
        return {
          iconBg: "bg-softPurple-100",
          iconText: "text-softPurple-600",
          valueText: "text-softPurple-600",
          noteClass: "badge-pastel-purple",
        }
      case "pink":
        return {
          iconBg: "bg-softPink-100",
          iconText: "text-softPink-600",
          valueText: "text-softPink-600",
          noteClass: "badge-pastel-pink",
        }
      default:
        return {
          iconBg: "bg-pastel-100",
          iconText: "text-pastel-600",
          valueText: "text-pastel-600",
          noteClass: "badge-pastel-orange",
        }
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="inline-block">
          <span className="badge-pastel-purple">📊 Ownership Overview</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl leading-tight">
          Transfer <span className="text-softPurple-500">Dashboard</span>
        </h1>
        <p className="section-subtitle text-xl max-w-2xl">
          Track vehicle ownership by Aadhaar and inspect recent blockchain transfer events in a clean view.
        </p>
      </section>

      <Card className="card-pastel">
        <CardBody className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-softPurple-100">
              <IconUser className="text-softPurple-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-muted">Logged in Aadhaar</p>
              <p className="font-semibold text-gray-700">{currentUserAadhaar ?? "Not logged in"}</p>
            </div>
          </div>

          <Button
            className="button-pastel-outline"
            startContent={<IconRefresh size={18} />}
            isLoading={loading}
            onClick={() => void loadDashboard()}
          >
            Refresh Data
          </Button>
        </CardBody>
      </Card>

      {statusMessage && (
        <div className="p-4 rounded-2xl badge-pastel-pink bg-softPink-50 text-sm font-medium">
          {statusMessage}
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const style = getStatStyles(stat.color)
          return (
            <Card key={stat.label} className="card-pastel">
              <CardBody className="p-5 gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted">{stat.label}</p>
                    <p className={`text-3xl font-bold ${style.valueText}`}>{stat.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${style.iconBg}`}>
                    <Icon className={style.iconText} size={22} />
                  </div>
                </div>
                <span className={`${style.noteClass} text-xs w-fit`}>{stat.note}</span>
              </CardBody>
            </Card>
          )
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-pastel">
          <CardHeader className="pb-3">
            <h2 className="text-2xl font-bold text-gray-700">Your Vehicles</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-6 space-y-3">
            {ownedVehicles.length === 0 ? (
              <p className="text-muted">No vehicles are currently mapped to this Aadhaar.</p>
            ) : (
              ownedVehicles.map((vehicle) => (
                <div
                  key={vehicle}
                  className="p-4 rounded-2xl border border-softGreen-200 bg-softGreen-50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-softGreen-100">
                      <IconCar className="text-softGreen-600" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">{vehicle}</p>
                      <p className="text-xs text-muted">Owner: {currentUserAadhaar}</p>
                    </div>
                  </div>
                  <Chip className="badge-pastel-green">Owned</Chip>
                </div>
              ))
            )}
          </CardBody>
        </Card>

        <Card className="card-pastel">
          <CardHeader className="pb-3">
            <h2 className="text-2xl font-bold text-gray-700">Recent Activity</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-6 space-y-3">
            {transactions.length === 0 ? (
              <p className="text-muted">No blockchain activity yet.</p>
            ) : (
              transactions.slice(0, 7).map((transaction) => (
                <div
                  key={transaction.transactionId}
                  className="p-4 rounded-2xl border border-softBlue-200 bg-softBlue-50"
                >
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">{transaction.vehicleRegistrationNumber}</p>
                    <p className="text-sm text-muted">
                      {transaction.fromAadhaar} → {transaction.toAadhaar}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-softBlue-600">
                      <IconLink size={14} />
                      <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
