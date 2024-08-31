import { create } from "zustand"

const AuthStore = create()((set) => ({
  isAuthenticated: false,
  user: null,

  logout: () => {
    localStorage.removeItem("token")
    set(() => ({
      user: null,
      isAuthenticated: false,
    }))
  },

  login: (user) => {
    set(() => ({
      user: user,
      isAuthenticated: true,
    }))
  },
}))
export default AuthStore
