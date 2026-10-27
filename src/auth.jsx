import { createContext, useContext, useEffect, useState } from 'react'
import { api, auth } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Another tab or a failed refresh ends the session.
  useEffect(() => {
    const onLogout = () => setUser(null)
    window.addEventListener('eb:logout', onLogout)
    return () => window.removeEventListener('eb:logout', onLogout)
  }, [])

  // On load, ask the API who the saved token belongs to.
  useEffect(() => {
    if (!auth.get()?.tokens) {
      setLoading(false)
      return
    }
    api('/me')
      .then((d) => {
        if (d.user) setUser(d.user)
        else auth.clear()
      })
      .catch(() => auth.clear())
      .finally(() => setLoading(false))
  }, [])

  const saveSession = (data) => {
    auth.set({ user: data.user, tokens: data.tokens })
    setUser(data.user)
    return data.user
  }

  const login = async (email, password) => {
    const d = await api('/login', { method: 'POST', body: { email, password } })
    return saveSession(d)
  }

  const register = async (fields) => {
    const d = await api('/register', { method: 'POST', body: fields })
    return saveSession(d)
  }

  const logout = async () => {
    const saved = auth.get()
    // Revoke the refresh token on the server. Clear locally even if that fails.
    await api('/logout', {
      method: 'POST',
      body: { refresh_token: saved?.tokens?.refresh_token },
    }).catch(() => {})
    auth.clear()
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
