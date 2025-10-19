'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  full_name?: string
  access_level: 'free' | 'premium'
  has_broker_account: boolean
  free_signals_count: number
  free_articles_count: number
  broker_verified_at?: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, full_name?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  isPremium: () => boolean
  getRemainingFree: (type: 'signals' | 'articles') => number
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount
  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    // Check if we're in the browser (not SSR)
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const token = localStorage.getItem('auth_token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Error loading user:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, full_name?: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed')
    }

    // Save token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.token)
    }
    setUser(data.user)
  }

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }

    // Save token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.token)
    }
    setUser(data.user)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
    setUser(null)
  }

  const refreshUser = async () => {
    await loadUser()
  }

  const isPremium = () => {
    return user?.has_broker_account === true
  }

  const getRemainingFree = (type: 'signals' | 'articles') => {
    if (isPremium()) return Infinity

    if (type === 'signals') {
      return Math.max(0, 3 - (user?.free_signals_count || 0))
    }
    if (type === 'articles') {
      return Math.max(0, 3 - (user?.free_articles_count || 0))
    }
    return 0
  }

  return (
    <UserContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      refreshUser,
      isPremium,
      getRemainingFree
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
