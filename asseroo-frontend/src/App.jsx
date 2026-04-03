import { useState } from "react"
import { Header } from "./components/Header"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import FormPage from "./pages/Form"
import DashboardPage from "./pages/Dashboard"
import { apiClient } from "./lib/api"

function App() {
  const [currentView, setCurrentView] = useState("home")
  const [currentUserAadhaar, setCurrentUserAadhaar] = useState(null)
  const [ownedVehicles, setOwnedVehicles] = useState([])

  const refreshOwnedVehicles = async (aadhaarNumber) => {
    const aadhaar = aadhaarNumber ?? currentUserAadhaar
    if (!aadhaar) {
      setOwnedVehicles([])
      return
    }

    try {
      const response = await apiClient.getVehiclesByOwner(aadhaar)
      setOwnedVehicles(response.vehicles)
    } catch {
      setOwnedVehicles([])
    }
  }

  const handleAuthenticated = (aadhaarNumber, vehicles) => {
    setCurrentUserAadhaar(aadhaarNumber)
    setOwnedVehicles(vehicles)
    setCurrentView("dashboard")
  }

  const navigationItems = [
    { label: "Home", onClick: () => setCurrentView("home") },
    { label: "Login", onClick: () => setCurrentView("login") },
    { label: "Transfer", onClick: () => setCurrentView("transfer") },
    { label: "Dashboard", onClick: () => setCurrentView("dashboard") },
  ]

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onNavigate={setCurrentView} />
      case "login":
        return <LoginPage onAuthenticated={handleAuthenticated} />
      case "transfer":
        return <FormPage currentUserAadhaar={currentUserAadhaar} onDataChanged={refreshOwnedVehicles} />
      case "dashboard":
        return <DashboardPage currentUserAadhaar={currentUserAadhaar} ownedVehicles={ownedVehicles} />
      default:
        return <HomePage onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-pastel pt-4 sm:pt-6">
      <Header items={navigationItems} />
      <main className="app-shell">{renderView()}</main>
    </div>
  )
}

export default App
