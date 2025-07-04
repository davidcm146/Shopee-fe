import type { User } from "@/types/user"
import { generateId } from "@/lib/user.utils"

export const mockUser: User = {
  userId: generateId(),
  name: "John Doe",
  email: "john.doe@example.com",
  password: "hashedpassword123", // This would be hashed in a real app
  address: ["123 Main St, New York, NY 10001", "456 Oak Ave, Brooklyn, NY 11201"],
  role: "BUYER",
  createdAt: new Date("2023-01-15"),
}