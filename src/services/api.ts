import axios from "axios"

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})