export interface User {
  userId: string
  name: string
  email: string
  password: string
  address: string[]
  role: "BUYER" | "SELLER"
  createdAt: Date
}

export interface UpdateUserProfile {
  name: string
  email: string
  address: string[]
  role?: string
}

export interface UpdateUserPassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
