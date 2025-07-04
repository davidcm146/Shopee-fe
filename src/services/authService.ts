import { api } from "./api" // your configured Axios instance
import type { User } from "../types/user"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: "BUYER" | "SELLER" | "ADMIN"
}

export async function login(data: LoginPayload): Promise<User> {
  try {
    const res = await api.post("/auth/login", data, { withCredentials: true })
    return {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
    }
  } catch (error) {
    throw new Error("Invalid credentials")
  }
}

export async function register(data: RegisterPayload): Promise<User> {
  try {
    const res = await api.post("/auth/register", data)
    return {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
    }
  } catch (error) {
    throw new Error("Registration failed")
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout", null, { withCredentials: true })
  } catch (error) {
    throw new Error("Failed to log out")
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await api.get("/auth/me", { withCredentials: true })
    return {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
    }
  } catch (error: any) {
    if (error.response?.status === 401) return null
    throw new Error("Failed to get current user")
  }
}
