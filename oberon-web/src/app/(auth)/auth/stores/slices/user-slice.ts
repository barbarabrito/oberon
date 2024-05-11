import { StateCreator } from "zustand"

type User = {
  id: string
  email: string
  created_at: string
  username: string
}

export interface UserState {
  User: User
}

export interface UserSlice {
  user: User
  setUser: (user: User) => void
}

export const createUserSlice: StateCreator<UserSlice, []> = (set) => {
  return {
    user: {} as User,
    setUser(user) {
      set((state) => ({
        ...state,
        user,
      }))
    },
  }
}
