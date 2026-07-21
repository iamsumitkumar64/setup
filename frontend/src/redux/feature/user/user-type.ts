import { UserRoleEnum } from "@/enums/user.role"

export interface User {
  uid: string
  email: string
  name: string
  role: UserRoleEnum
}

export interface UserState {
  user: User | null
  token: string
  loading: boolean
  error: string | null
  status: "pending" | "succeed" | "rejected"
}