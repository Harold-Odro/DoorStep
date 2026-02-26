import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/axios'

const AuthContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/me')
      setUser(res.data.user)
    } catch {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [token, fetchUser])

  async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  async function register(name, email, password, password_confirmation) {
    const res = await api.post('/api/auth/register', {
      name, email, password, password_confirmation
    })
    localStorage.setItem('token', res.data.token)
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout')
    } catch {
      // ignore
    }
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user, token, isAuthenticated, isAdmin, isLoading,
      login, register, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
