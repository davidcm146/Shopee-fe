import { api } from "./api"
import type { User, UpdateUserProfile, UpdateUserPassword } from "../types/user"

const BASE_URL = "/users"

export async function fetchUser(userId: string): Promise<User> {
  const res = await api.get<User>(`${BASE_URL}/${userId}`)
  return {
    ...res.data,
    createdAt: new Date(res.data.createdAt),
  }
}

export async function updateUserProfile(userId: string, data: UpdateUserProfile): Promise<User> {
  const res = await api.put<User>(`${BASE_URL}/${userId}/profile`, data)
  return res.data
}

export async function updateUserPassword(userId: string, data: UpdateUserPassword): Promise<void> {
  await api.put(`${BASE_URL}/${userId}/password`, data)
}
