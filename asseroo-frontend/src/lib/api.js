import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  timeout: 10000,
})

export const apiClient = {
  registerAadhaar: async (aadhaarNumber) => {
    const { data } = await api.post("/auth/register", { aadhaarNumber })
    return data
  },

  loginAadhaar: async (aadhaarNumber) => {
    const { data } = await api.post("/auth/login", { aadhaarNumber })
    return data
  },

  registerVehicle: async (vehicleRegistrationNumber, ownerAadhaarNumber) => {
    const { data } = await api.post("/vehicles/register", {
      vehicleRegistrationNumber,
      ownerAadhaarNumber,
    })
    return data
  },

  transferVehicle: async (vehicleRegistrationNumber, fromAadhaarNumber, toAadhaarNumber) => {
    const { data } = await api.post("/vehicles/transfer", {
      vehicleRegistrationNumber,
      fromAadhaarNumber,
      toAadhaarNumber,
    })
    return data
  },

  getVehiclesByOwner: async (aadhaarNumber) => {
    const { data } = await api.get(`/users/${aadhaarNumber}/vehicles`)
    return data
  },

  getTransactions: async () => {
    const { data } = await api.get("/blockchain/transactions")
    return data
  },

  getChainValidity: async () => {
    const { data } = await api.get("/blockchain/valid")
    return data
  },
}

export const parseApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    return message ?? "Request failed. Please try again."
  }

  return "Unexpected error."
}
