import { create } from 'zustand'

type State = {
  isAuthenticated: boolean
  user: {
    username: string
    password: string
  }
  token: string
}

type Action = {
  setUser: (user: { username: string; password: string }) => void
  setToken: (token: string) => void
}

const AuthStore = create<State & Action>()((set) => ({
  isAuthenticated: false,
  user: {
    username: '',
    password: ''
  },
  token: '',
  setUser: (user: { username: string; password: string }) => {
    set({
      user: user
    })
  },
  setToken: (token: string) => {
    set({
      token: token
    })
  }
}))

export default AuthStore
