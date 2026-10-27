import { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Ask the server who is logged in (the session cookie identifies the user).
  useEffect(() => {
    api('/me')
      .then((d) => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const d = await api('/login', { method: 'POST', body: { email, password } })
    setUser(d.user)
    return d.user
  }

  const register = async (fields) => {
    const d = await api('/register', { method: 'POST', body: fields })
    setUser(d.user)
    return d.user
  }

  const logout = async () => {
    await api('/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
